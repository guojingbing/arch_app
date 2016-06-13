package lab.s2jh.module.crawl.filter;

import javax.xml.transform.TransformerException;

import lab.s2jh.core.crawl.AbstractHtmlParseFilter;
import lab.s2jh.core.util.ExtStringUtils;
import lab.s2jh.module.crawl.vo.WebPage;

import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.mongodb.DBObject;
import com.sun.org.apache.xpath.internal.XPathAPI;

public class WebSiteContactInfoDetailHtmlParseFilter extends AbstractHtmlParseFilter {

    private static final String[] keywords = { " Hotline" , " address", " email ", " Zip", " zip code", " fax", "Email", "QQ", "Q l Q" };

    @Override
    public DBObject filterInternal(String url, WebPage webPage, DBObject parsedDBObject) throws TransformerException {
        String pageText = webPage.getPageText();

        Node df = parse(pageText);

        Node headNode = selectSingleNode(df, "//HEAD");
        headNode.getParentNode().removeChild(headNode);

        NodeList scriptNodes = selectNodeList(df, "//SCRIPT");
        if (scriptNodes != null && scriptNodes.getLength() > 0) {
            for (int i = 0; i < scriptNodes.getLength(); i++) {
                Node node = scriptNodes.item(i);
                node.getParentNode().removeChild(node);
            }
        }

        String allContactInfo = "";

        NodeList textNodes = XPathAPI.selectNodeList(df, "//text()");
        if (textNodes != null && textNodes.getLength() > 0) {
            for (int i = 0; i < textNodes.getLength(); i++) {
                Node node = textNodes.item(i);
                String text = node.getTextContent();
                if (text.indexOf("hotline:") > -1 || text.indexOf("hotline:") > -1 || text.indexOf("phone:") > -1 || text.indexOf("phone:") > -1) {
                    Node totalTextNode = node;
                    int level = 1;
                    String contactInfo = null;
                    do {
                        contactInfo = totalTextNode.getTextContent();
                        int matchCount = 0;
                        if (contactInfo.indexOf("address") > -1) {
                            matchCount++;
                        }
                        if (contactInfo.indexOf("hotline") > -1) {
                            matchCount++;
                        }
                        if (contactInfo.indexOf("phone") > -1) {
                            matchCount++;
                        }
                        if (contactInfo.indexOf("mailbox") > -1) {
                            matchCount++;
                        }
                        if (contactInfo.indexOf("Zip Code") > -1) {
                            matchCount++;
                        }
                        if (contactInfo.indexOf("Zip code") > -1) {
                            matchCount++;
                        }
                        if (contactInfo.indexOf("fax") > -1) {
                            matchCount++;
                        }
                     // Valid even if two matches
                        if (level == 1 && matchCount >= 3) {
                            break;
                        }
                        if (level > 1 && matchCount >= 2) {
                            break;
                        }
                        totalTextNode = totalTextNode.getParentNode();
                        contactInfo = null;
                    } while (level++ < 4);

                    if (StringUtils.isNotBlank(contactInfo)) {
                        allContactInfo = allContactInfo + contactInfo + "\r\n";
                    }
                }
            }
        }

        if (StringUtils.isBlank(allContactInfo)) {
            Node navNode = null;
            NodeList nodes = XPathAPI.selectNodeList(df, "//A[contains(text(),'首页')]");
            if (nodes != null && nodes.getLength() > 0) {
                for (int i = nodes.getLength(); i > 0; i--) {
                    if (navNode != null) {
                        break;
                    }
                    Node node = nodes.item(i - 1);
                    Node loopNode = node;
                    do {
                        String text = loopNode.getTextContent();
                        if (text.indexOf("联系我们") > -1 || text.indexOf("联系方式") > -1) {
                            navNode = loopNode;
                            break;
                        }
                        loopNode = loopNode.getParentNode();
                    } while (true);
                }
            }

            if (navNode != null) {
                Node loopNode = navNode;
                do {
                    String text = loopNode.getTextContent();
                    for (String keyword : keywords) {
                        if (text.indexOf(keyword) > -1) {
                            allContactInfo = text;
                            break;
                        }
                    }

                    Node nextSlibing = loopNode.getNextSibling();
                    if (nextSlibing != null) {
                        text = nextSlibing.getTextContent();
                        for (String keyword : keywords) {
                            if (text.indexOf(keyword) > -1) {
                                allContactInfo = text;
                                break;
                            }
                        }
                    }

                    loopNode = loopNode.getParentNode();
                } while (loopNode != null);
            }
        }

        if (StringUtils.isNotBlank(allContactInfo)) {
            allContactInfo = allContactInfo.trim();
            allContactInfo = ExtStringUtils.cutRedundanceStr(allContactInfo, 1024);
            parsedDBObject.put("Contact Information", allContactInfo);
            logger.debug("Parsed contact info: {}", allContactInfo);
        }
        return parsedDBObject;
    }

    @Override
    public String getUrlFilterRegex() {
        return null;
    }
}
