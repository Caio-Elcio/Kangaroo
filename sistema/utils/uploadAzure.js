const multer = require('multer');
const {MulterAzureStorage} = require('multer-azure-blob-storage'); 
const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=storagekangaroo;AccountKey=Xf1TT+fBw1x/5Ssxf/G9+71Mspdkd8jSr+jaj87GXwEpaSWmS1lBjJEOPA4d5Xz721QfL0EJk8LD+9d5FIEsyQ==;EndpointSuffix=core.windows.net',
    accessKey: 'Xf1TT+fBw1x/5Ssxf/G9+71Mspdkd8jSr+jaj87GXwEpaSWmS1lBjJEOPA4d5Xz721QfL0EJk8LD+9d5FIEsyQ==',
    accountName: 'storagekangaroo',
    containerName: 'kangaroo-container',
    containerAccessLevel: 'blob',
    blobName: (req,file) => req.params.idDependente
});
const uploadAzure = multer({storage: azureStorage})

module.exports = uploadAzure;