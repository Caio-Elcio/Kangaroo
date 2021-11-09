from azure.storage.blob import BlockBlobService
from cv2 import VideoCapture, resize, destroyAllWindows
from face_recognition import load_image_file, face_encodings, compare_faces, face_locations
from flask import Flask, jsonify
from flask_cors import CORS
from logging import basicConfig, info, INFO
from os import listdir,remove
import glob,os.path
from os.path import isfile, join
from shutil import copyfile

app = Flask(__name__)
CORS(app)

@app.route("/download-image", methods =["GET","POST"])
def run_download():
    try:
        # Criando o serviço blob com o nome da conta e a chave
        blob_service_client = BlockBlobService(
            account_name='storagekangaroo', account_key='Xf1TT+fBw1x/5Ssxf/G9+71Mspdkd8jSr+jaj87GXwEpaSWmS1lBjJEOPA4d5Xz721QfL0EJk8LD+9d5FIEsyQ==')

        # Nome do nosso container na azure
        container_name = 'kangaroo-container'

        # Mostrando todos os nossos blobs que tem dentro do container
        print("\nList blobs in the container")
        generator = blob_service_client.list_blobs(container_name)
        
        # Caminho do local que se deve salvar as imagens
        path_save =  ".\\dependentes\\" 
        print("\nBaixando blob para a pasta: " + path_save)
        
        filelist = [ f for f in os.listdir("dependentes/")] 
        for f in filelist: os.remove(os.path.join("dependentes/", f))
        # Exibe o nome do blob e baixa
        for blob in generator:
            print("\t Blob name: " + blob.name)
            blob_service_client.get_blob_to_path(
                container_name, blob.name, path_save + blob.name)

        return ""
    except Exception as e:
        print(e)
        return "Deu erro"


@app.route('/reconhecimento-facial', methods =['PUT'])
def face_recognition():
    basicConfig(filename='log/main.log', level=INFO)
    path = 'dependentes'
    files = [f for f in listdir(path) if isfile(join(path, f))]
    info(f'Lendo o conteúdo da pasta: {path}')

    known_face_encodings = []

    for file in files:
        image = load_image_file(f'dependentes/{file}')
        known_face_encodings.append(face_encodings(image)[0]) 
        info('Criando um array com as fotos dentro da pasta')

    video_capture = VideoCapture(0)
    info('Ligando a câmera...')

    face_found = []
    face_with_encodings = []
    process_this_frame = True
    try_again = True
    max_tentativas = 0

    while max_tentativas <= 90 and try_again == True:
        max_tentativas+=1        
        info(f'Tentativa: {max_tentativas}')

        info('Iniciando a captura da imagem')
        ret, frame = video_capture.read()

        info('Deixando em um frame menor')
        small_frame = resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]
        
        if process_this_frame:
            face_found = face_locations(rgb_small_frame)
            face_with_encodings = face_encodings(rgb_small_frame, face_found)

            for face_encoding in face_with_encodings:
                info('Comparando as imagens')
                matches = compare_faces(known_face_encodings, face_encoding)

                if True in matches:
                    info('Imagem encontrada!')
                    first_match_index = matches.index(True)
                    name = files[first_match_index]
                    try_again = False   
                    info('Exibindo resultado...')  
                    filelist = [ f for f in os.listdir("logado/")] 
                    for f in filelist: os.remove(os.path.join("logado/", f))
                    copyfile(f'dependentes/{name}',f'logado/{name}')
                    break

                info('Pessoa não encontrada')
                try_again = True

        
        process_this_frame = not process_this_frame

    info('Finalizando programa...')
    if max_tentativas>= 90: print('Pessoa não encontrada! Finalizando o programa.')

    video_capture.release()
    destroyAllWindows()
    return "Pessoa reconhecida."

@app.route('/retorno-id',methods=['GET'])
def retorno_id():
    path = 'logado'
    files = [f for f in listdir(path) if isfile(join(path, f))]
    idFoto = files[0].split(".")
    idFoto = idFoto[0]
    idFoto = int(idFoto)
    print(idFoto)
    return jsonify(
        id = idFoto,
    ) 
