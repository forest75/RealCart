import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class test {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String string = "Hello World";
        byte[] utf8Bytes = string.getBytes("UTF-8");
        System.out.println(Arrays.toString(utf8Bytes));
    }
}
