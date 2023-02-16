package com.ssafy.realcart.game;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Test {

    public static void main(String[] args) throws Exception{
        try {
            String requestBody = "fleur,12342,소정캡짱,195812";
            // EC2에서는 수정
            String url = "https://i8a403.p.ssafy.io/api/game/result";
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "text/plain");
//            con.setRequestProperty("Content-Length", Integer.toString(requestBody.length()));
            con.setUseCaches(false);

            System.out.println(requestBody);
            try (DataOutputStream dos = new DataOutputStream(con.getOutputStream())) {
                dos.writeUTF(requestBody);
            }

            try (BufferedReader br = new BufferedReader(new InputStreamReader(
                    con.getInputStream()))) {
                String line;
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
