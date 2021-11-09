package com.mycompany.kangarooproject;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

public class ScriptPython {

    public void runScript() {
        HttpResponse<String> responseOne = Unirest.get("http://127.0.0.1:5000/download-image")
                .asString();
        HttpResponse<String> responseTwo = Unirest.put("http://127.0.0.1:5000/reconhecimento-facial")
                .asString();
    }
}