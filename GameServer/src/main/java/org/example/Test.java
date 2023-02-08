package org.example;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Test {

    public static void main(String[] args) throws Exception{
        String url = "http://127.0.0.1:8060/game/result";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        String postData = "";

        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        con.setRequestProperty("Content-Length", Integer.toString(postData.length()));
        con.setUseCaches(false);

        try (DataOutputStream dos = new DataOutputStream(con.getOutputStream())) {
            dos.writeBytes(postData);
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(
                con.getInputStream())))
        {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
}
