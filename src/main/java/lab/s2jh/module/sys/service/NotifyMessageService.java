package lab.s2jh.module.sys.service;

import java.util.Date;
import java.util.List;

import lab.s2jh.core.dao.jpa.BaseDao;
import lab.s2jh.core.service.BaseService;
import lab.s2jh.core.util.DateUtils;
import lab.s2jh.module.auth.entity.User;
import lab.s2jh.module.sys.dao.NotifyMessageDao;
import lab.s2jh.module.sys.dao.NotifyMessageReadDao;
import lab.s2jh.module.sys.entity.NotifyMessage;
import lab.s2jh.module.sys.entity.NotifyMessageRead;
import lab.s2jh.support.service.MessagePushService;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;

@Service
@Transactional
public class NotifyMessageService extends BaseService<NotifyMessage, Long> {

    private static final Logger logger = LoggerFactory.getLogger(NotifyMessageService.class);

    @Autowired
    private NotifyMessageDao notifyMessageDao;

    @Autowired
    private NotifyMessageReadDao notifyMessageReadDao;

    @Autowired(required = false)
    private MessagePushService messagePushService;

    @Override
    protected BaseDao<NotifyMessage, Long> getEntityDao() {
        return notifyMessageDao;
    }

    /**
     * Query User Bulletin number of messages unread
     * @param User currently logged on user
     */
    @Transactional(readOnly = true)
    public Long findCountToRead(User user, String platform, String... tags) {
        if (user == null) {
            return 0L;
        }
        List<NotifyMessage> scopeEffectiveMessages = findEffectiveMessages(user, platform, tags);
        if (CollectionUtils.isEmpty(scopeEffectiveMessages)) {
            return 0L;
        }

        List<Long> scopeEffectiveMessageIds = Lists.newArrayList();
        for (NotifyMessage nm : scopeEffectiveMessages) {
            scopeEffectiveMessageIds.add(nm.getId());
        }

        List<NotifyMessageRead> notifyMessageReads = notifyMessageReadDao.findByReadUserAndNotifyMessageIn(user.getId(), scopeEffectiveMessageIds);
        return scopeEffectiveMessages.size() - (notifyMessageReads == null ? 0L : notifyMessageReads.size());
    }

    /**
     * Discover news bulletin
     * @param User currently logged on user
     */
    @Transactional(readOnly = true)
    public List<NotifyMessage> findEffectiveMessages(User user, String platform, String... tags) {
        List<NotifyMessage> effectiveMessages = notifyMessageDao.findEffectiveMessages();

        List<NotifyMessage> scopeEffectiveMessages = Lists.newArrayList();

        if (CollectionUtils.isEmpty(effectiveMessages)) {
            return scopeEffectiveMessages;
        }


     // Refer http://docs.jpush.io/server/rest_api_v3_push/#audience
             // Value of each type of both arrays (Array), an array of a plurality of values ​​implicit in the relationship between yes yes OR, that is, take the union . But tag_and different and multiple values ​​among its array AND relationship , which intersected .
             // 4 types need at least one. If the value of the array length is zero, indicating that the type does not exist .
             // These types can coexist . When the coexistence of multiple implicit relationship is AND, that is intersected .

             // AudienceXXX judgment based on the current user bulletin listing

        scopeEffectiveMessages = filterByPlatform(effectiveMessages, platform);
        if (CollectionUtils.isEmpty(scopeEffectiveMessages)) {
            return scopeEffectiveMessages;
        }

        if (tags == null || tags.length == 0) {
            List<NotifyMessage> toRemoves = Lists.newArrayList();
            for (NotifyMessage notifyMessage : scopeEffectiveMessages) {
                if (!notifyMessage.isPublic()) {
                    toRemoves.add(notifyMessage);
                }
            }
            scopeEffectiveMessages.removeAll(toRemoves);
            return scopeEffectiveMessages;
        }

        scopeEffectiveMessages = filterByAudienceTags(scopeEffectiveMessages, tags);
        if (CollectionUtils.isEmpty(scopeEffectiveMessages)) {
            return scopeEffectiveMessages;
        }

        scopeEffectiveMessages = filterByAudienceAndTags(scopeEffectiveMessages, tags);
        if (CollectionUtils.isEmpty(scopeEffectiveMessages)) {
            return scopeEffectiveMessages;
        }

        scopeEffectiveMessages = filterByAudienceAlias(scopeEffectiveMessages, user);

        return scopeEffectiveMessages;
    }

    private List<NotifyMessage> filterByPlatform(List<NotifyMessage> notifyMessages, String platform) {
        List<NotifyMessage> returnList = Lists.newArrayList();
        for (NotifyMessage notifyMessage : notifyMessages) {
            if (StringUtils.isBlank(notifyMessage.getPlatform()) || StringUtils.isBlank(platform)
                    || notifyMessage.getPlatform().indexOf(platform) != -1) {
                returnList.add(notifyMessage);
            }
        }

        return returnList;
    }

    private List<NotifyMessage> filterByAudienceTags(List<NotifyMessage> notifyMessages, String... tags) {
        List<NotifyMessage> returnList = Lists.newArrayList();
        for (NotifyMessage notifyMessage : notifyMessages) {
            if (StringUtils.isBlank(notifyMessage.getAudienceTags()) || notifyMessage.isPublic()) {
                returnList.add(notifyMessage);
            } else {

                String[] setTags = notifyMessage.getAudienceTags().trim().split(",");

                for (String tag : tags) {
                    boolean scope = false;
                    for (String setTag : setTags) {
                        if (setTag.trim().equals(tag.trim())) {
                            scope = true;
                            break;
                        }
                    }
                    if (scope) {
                        returnList.add(notifyMessage);
                        break;
                    }
                }
            }
        }

        return returnList;
    }

    private List<NotifyMessage> filterByAudienceAndTags(List<NotifyMessage> notifyMessages, String... tags) {
        List<NotifyMessage> returnList = Lists.newArrayList();
        for (NotifyMessage notifyMessage : notifyMessages) {
            if (StringUtils.isBlank(notifyMessage.getAudienceAndTags()) || notifyMessage.isPublic()) {
                returnList.add(notifyMessage);
            } else {
                String[] setTags = notifyMessage.getAudienceTags().trim().split(",");
                boolean scope = true;
                for (String setTag : setTags) {
                    for (String tag : tags) {
                        if (setTag.trim().equals(tag.trim())) {
                            scope = true;
                            break;
                        } else {
                            scope = false;
                        }
                    }
                    if (!scope) {
                        break;
                    }
                }
                if (scope) {
                    returnList.add(notifyMessage);
                }
            }
        }

        return returnList;
    }

    private List<NotifyMessage> filterByAudienceAlias(List<NotifyMessage> notifyMessages, User user, String... tags) {
        List<NotifyMessage> returnList = Lists.newArrayList();
        for (NotifyMessage notifyMessage : notifyMessages) {
            if (StringUtils.isBlank(notifyMessage.getAudienceAlias()) || notifyMessage.isPublic()) {
                returnList.add(notifyMessage);
            } else {
                if (user != null) {
                    //                    for (String tag : tags) {
                    //                        if (tag.trim().equals(user.getAlias())) {
                    //                            returnList.add(notifyMessage);
                    //                        }
                    //                    }
                    String[] aliasArray = notifyMessage.getAudienceAlias().trim().split(",");
                    for (String alias : aliasArray) {
                        if (user.getAlias().equals(alias)) {
                            returnList.add(notifyMessage);
                        }
                    }
                }
            }
        }

        return returnList;
    }

    /**
     * Discover news bulletin
     * @param User currently logged on user
     */
    @Transactional(readOnly = true)
    public List<NotifyMessage> findStatedEffectiveMessages(User user, String platform, Boolean readState, String... tags) {
        List<NotifyMessage> statedEffectiveMessages = Lists.newArrayList();
        List<NotifyMessage> scopeEffectiveMessages = findEffectiveMessages(user, platform, tags);
        if (CollectionUtils.isEmpty(scopeEffectiveMessages) || user == null) {
            return statedEffectiveMessages;
        }

        List<Long> scopeEffectiveMessageIds = Lists.newArrayList();
        for (NotifyMessage nm : scopeEffectiveMessages) {
            scopeEffectiveMessageIds.add(nm.getId());
        }

        List<NotifyMessageRead> notifyMessageReads = notifyMessageReadDao.findByReadUserAndNotifyMessageIn(user.getId(), scopeEffectiveMessageIds);
        for (NotifyMessage notifyMessage : scopeEffectiveMessages) {
            boolean readed = false;
            for (NotifyMessageRead notifyMessageRead : notifyMessageReads) {
                if (notifyMessageRead.getNotifyMessage().getId().equals(notifyMessage.getId())) {
                    readed = true;
                    break;
                }
            }
            notifyMessage.setReaded(readed);

            if (readState == null || readState.equals(notifyMessage.getReaded())) {
                statedEffectiveMessages.add(notifyMessage);
            }
        }

        return statedEffectiveMessages;
    }

    public void processUserRead(NotifyMessage notifyMessage, User user) {
        NotifyMessageRead notifyMessageRead = notifyMessageReadDao.findByNotifyMessageAndReadUser(notifyMessage, user);
        if (notifyMessageRead == null) {
            notifyMessageRead = new NotifyMessageRead();
            notifyMessageRead.setNotifyMessage(notifyMessage);
            notifyMessageRead.setReadUser(user);
            notifyMessageRead.setFirstReadTime(DateUtils.currentDate());
            notifyMessageRead.setLastReadTime(notifyMessageRead.getFirstReadTime());
            notifyMessageRead.setReadTotalCount(1);
            notifyMessage.setReadUserCount(notifyMessage.getReadUserCount() + 1);
        } else {
            notifyMessageRead.setLastReadTime(DateUtils.currentDate());
            notifyMessageRead.setReadTotalCount(notifyMessageRead.getReadTotalCount() + 1);
        }
        notifyMessageReadDao.save(notifyMessageRead);
        notifyMessageDao.save(notifyMessage);
    }

    /**
     * Regularly updated news bulletin into force status
     */
    @Scheduled(fixedRate = 5 * 60 * 1000)
    public void updateTobeEffectiveMessagesTimely() {
        if (logger.isDebugEnabled()) {
            logger.debug("Timely updateTobeEffectiveMessages at Thread: {}...", Thread.currentThread().getId());
        }
        List<NotifyMessage> notifyMessages = notifyMessageDao.findTobeEffectiveMessages();
        if (CollectionUtils.isNotEmpty(notifyMessages)) {
            Date now = DateUtils.currentDate();
            for (NotifyMessage notifyMessage : notifyMessages) {
                Boolean oldState = notifyMessage.getEffective();

             // Current plans to release time has elapsed time, set to take effect
                if (now.after(notifyMessage.getPublishTime())) {
                    notifyMessage.setEffective(Boolean.TRUE);
                }

             // The current plan expires time has passed , set to fail
                if (notifyMessage.getExpireTime() != null && now.after(notifyMessage.getExpireTime())) {
                    notifyMessage.setEffective(Boolean.FALSE);
                }
                if (notifyMessage.getEffective() != null && !notifyMessage.getEffective().equals(oldState)) {
                    logger.debug("Update notifyMessage[{}] effective state from {} to {}", notifyMessage.getDisplay(), oldState,
                            notifyMessage.getEffective());
                    notifyMessageDao.save(notifyMessage);
                    pushMessage(notifyMessage);
                }
            }
        }
    }

    /**
     * Push message processing
     * @param entity
     */
    public void pushMessage(NotifyMessage entity) {
        if (messagePushService != null) {
            if (entity.getLastPushTime() == null && Boolean.TRUE.equals(entity.getEffective())) {
                Boolean pushResult = messagePushService.sendPush(entity);
                if (pushResult == null || pushResult) {
                    entity.setLastPushTime(DateUtils.currentDate());
                    notifyMessageDao.save(entity);
                }
            }
        } else {
            logger.warn("MessagePushService implement NOT found.");
        }
    }

    public List<NotifyMessage> findEffectiveMessage() {
        return notifyMessageDao.findEffectiveMessages();
    }

    @Override
    public NotifyMessage save(NotifyMessage entity) {
        super.save(entity);
        updateTobeEffectiveMessagesTimely();
        return entity;
    }
}
