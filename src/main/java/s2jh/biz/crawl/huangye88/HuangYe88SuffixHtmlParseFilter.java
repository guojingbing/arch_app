package s2jh.biz.crawl.huangye88;

import lab.s2jh.core.util.ExtStringUtils;
import lab.s2jh.module.crawl.vo.WebPage;

import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.DocumentFragment;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.mongodb.DBObject;

public class HuangYe88SuffixHtmlParseFilter extends HuangYe88BaseHtmlParseFilter {

    @Override
    public DBObject filterInternal(String url, WebPage webPage, DBObject parsedDBObject) {
        String pageText = webPage.getPageText();
        DocumentFragment doc = parse(pageText);

       
        Node node = selectSingleNode(doc, "//div[@class='introduct']/p");
        if (node != null) {
            String introduct = getXPathValue(node, "./");
            introduct = ExtStringUtils.cutRedundanceStr(introduct.trim(), 3000);
            putKeyValue(parsedDBObject, "Company Profile", introduct);
        }

       
        NodeList nodes = selectNodeList(doc, "//div[@class='Contact']//tr");
        if (nodes != null && nodes.getLength() > 0) {
            for (int i = 0; i < nodes.getLength(); i++) {
                Node n = nodes.item(i);
                String content = n.getTextContent();
                
                String[] nodeTexts = StringUtils.split(content, "：");
                
                if (nodeTexts.length <= 1) {
                    nodeTexts = StringUtils.split(content, ":");
                }
                if (nodeTexts.length > 1) {
                    putKeyValue(parsedDBObject, nodeTexts[0].trim(), nodeTexts[1].trim());
                }
            }
        }
        if (node == null && (nodes == null || nodes.getLength() < 1)) {
            return null;
        } else {
            return parsedDBObject;
        }
    }

    @Override
    public String getUrlFilterRegex() {
        return "^http://b2b.huangye88.com/qiye[^/]*/?";
    }

    @Override
    protected String getPrimaryKey(String url) {
        return StringUtils.substringBefore(StringUtils.substringAfter(url, "http://b2b.huangye88.com/qiye"), "/");
    }
}
