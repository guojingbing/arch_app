package lab.s2jh.core.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringEscapeUtils;

/**
 * Encoding and decoding tools package a variety of formats .
 *
 * 1.Commons-Codec 's hex / base64 encoding
 * 2. homemade base62 encoding
 * 3.Commons-Lang 's xml / html escape
 * 4.JDK provided URLEncoder
 * 
 */
public class Encodes {

    private static final String DEFAULT_URL_ENCODING = "UTF-8";
    private static final char[] BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".toCharArray();

    /**
     * Hex encoding.
     */
    public static String encodeHex(byte[] input) {
        return Hex.encodeHexString(input);
    }

    /**
     * Hex decoding.
     */
    public static byte[] decodeHex(String input) {
        try {
            return Hex.decodeHex(input.toCharArray());
        } catch (Exception e) {
            throw Exceptions.unchecked(e);
        }
    }

    /**
     * Base64 encoding.
     */
    public static String encodeBase64(byte[] input) {
        return Base64.encodeBase64String(input);
    }

    /**
     * Base64 encoding.
     */
    public static String encodeBase64(String input) {
        try {
            return Base64.encodeBase64String(input.getBytes(HttpClientUtils.CHARSET_UTF8));
        } catch (Exception e) {
            throw Exceptions.unchecked(e);
        }
    }

    /**
     * Base64 encoding , URL security ( the Base64 in URL illegal 
     * character '+' and '/ ' to ' - ' and ' _ ', see RFC3548).
     */
    public static String encodeUrlSafeBase64(byte[] input) {
        return Base64.encodeBase64URLSafeString(input);
    }

    /**
     * Base64 decoding.
     */
    public static byte[] decodeBase64(String input) {
        return Base64.decodeBase64(input);
    }

    /**
     * Base62 encoding.
     */
    public static String encodeBase62(byte[] input) {
        char[] chars = new char[input.length];
        for (int i = 0; i < input.length; i++) {
            chars[i] = BASE62[(input[i] & 0xFF) % BASE62.length];
        }
        return new String(chars);
    }

    /**
     * Html transcoding.
     */
    public static String escapeHtml(String html) {
        return StringEscapeUtils.escapeHtml4(html);
    }

    /**
     * Html decoding.
     */
    public static String unescapeHtml(String htmlEscaped) {
        return StringEscapeUtils.unescapeHtml4(htmlEscaped);
    }

    /**
     *Xml transcoding
     */
    public static String escapeXml(String xml) {
        return StringEscapeUtils.escapeXml(xml);
    }

    /**
     * Xml decoding.
     */
    public static String unescapeXml(String xmlEscaped) {
        return StringEscapeUtils.unescapeXml(xmlEscaped);
    }

    /**
     * URL encoding , Encode default is UTF-8.
     */
    public static String urlEncode(String part) {
        try {
            return URLEncoder.encode(part, DEFAULT_URL_ENCODING);
        } catch (UnsupportedEncodingException e) {
            throw Exceptions.unchecked(e);
        }
    }

    /**
     * URL decoding , Encode default is UTF-8.
     */
    public static String urlDecode(String part) {

        try {
            return URLDecoder.decode(part, DEFAULT_URL_ENCODING);
        } catch (UnsupportedEncodingException e) {
            throw Exceptions.unchecked(e);
        }
    }

    public static void main(String[] args) {
        String text = "18696597327";
        System.out.println("Base64 encode for '" + text + "' is " + encodeBase64(text.getBytes()));
    }
}
