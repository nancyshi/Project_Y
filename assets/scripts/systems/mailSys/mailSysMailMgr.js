// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        mailId: null,
        relatedMailSectionNode: cc.Node,
        relatedMailSysMgr: null,
        mailOptionNodePrefab: cc.Prefab,
        disOfContentAndOptionSection: 200,
        disOfOptionNodes: 25,
        headerHeight: 82,
        footerHeight: 80
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var bg = this.node.getChildByName("bg")
        bg.width = cc.winSize.width
        bg.height = cc.winSize.height
        bg.on("touchstart",function(){})

        this.setupContentSection()
        this.setupOptionSection()
        this.setupUiBg()
    },

    start () {

    },

    close() {
        this.node.destroy()
    },

    setupContentSection() {
        var textConfig = require("textConfig")
        var mailConfig = require("mailConfig")
        var mail = mailConfig[this.mailId]
        var content = this.node.getChildByName("others").getChildByName("contentSection").getChildByName("view").getChildByName("content")
        var titleLabel = content.getChildByName("titleLabel")
        var contentLabel = content.getChildByName("contentLabel")

        // titleLabel.getComponent(cc.Label).string = mail.title
        // contentLabel.getComponent(cc.Label).string = mail.content
        titleLabel.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(mail.titleTextId)
        contentLabel.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(mail.contentTextId)
        content.height = -contentLabel.y + contentLabel.height
    },

    setupOptionSection() {
        var textConfig = require("textConfig")
        var optionSection = this.node.getChildByName("others").getChildByName("optionSection")
        var mailConfig = require("mailConfig")
        var mail = mailConfig[this.mailId]
        var options = mail.options
        mail = require("dataMgr").playerData.mails[this.mailId]
        if (mail.status == 0) {
            //unreaded mail
            if (options.length == 0) {
                var okOptionNode = cc.instantiate(this.mailOptionNodePrefab)
                var okLabelNode = okOptionNode.getChildByName("label")
                okLabelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(147)
                var okBgNode = okOptionNode.getChildByName("bg")
                okOptionNode.width = okBgNode.width
                okOptionNode.height = okBgNode.height
                optionSection.height += okOptionNode.height
                var self = this
                okOptionNode.on("click",function(){
                    var onMailReaded = function() {
                        self.close()
                    }
                    self.relatedMailSysMgr.setOneMailReaded(self.mailId, -1, onMailReaded,self.relatedMailSectionNode)
                })
                okOptionNode.y = -(optionSection.height - okOptionNode.height)
                optionSection.addChild(okOptionNode)
                return
            }

            for (var index in options) {
                var oneOption = options[index]
                var optionNode = cc.instantiate(this.mailOptionNodePrefab)
                var labelNode = optionNode.getChildByName("label")
                // labelNode.getComponent(cc.Label).string = oneOption.showText
                labelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(oneOption.showTextId)
                
                var bgNode = optionNode.getChildByName("bg")
                bgNode.height = labelNode.height

                optionNode.width = bgNode.width
                optionNode.height = bgNode.height

                if (index == 0) {
                    optionSection.height += optionNode.height
                }
                else {
                    optionSection.height += optionNode.height + this.disOfOptionNodes
                }

                optionNode.y = -(optionSection.height - optionNode.height)
                var operationType = oneOption.operationType
                var operationPara = oneOption.operationPara
                var self = this
                var bindFunction = function(givenNode,givenOperationType,givenOperationPara,indexOfOptions) {
                    givenNode.on("click",function(){
                        //no matter what option be selected, this mail will be readed
                        var onMailReaded = function() {
                            if (givenOperationType == 1) {
                                self.close()
                            }
                            else if (givenOperationType == 2) {
                                // mailSys.sendOneMail(givenOperationPara.mailId, mail.tag, givenOperationPara.delay)
                                require("systemsMgr").mailSysGloableSendOneMail(givenOperationPara.mailId,mail.tag, function(){},givenOperationPara.delay)
                                self.close()
                            }
                        }
                        self.relatedMailSysMgr.setOneMailReaded(self.mailId,indexOfOptions,onMailReaded,self.relatedMailSectionNode)
                    })
                }
                bindFunction(optionNode, operationType, operationPara, index)
                optionSection.addChild(optionNode)
            }
        }

        else if (mail.status == 1) {
            //readed mail
            if (mail.selectedOptionIndex != -1) {
                var selectedOptionIndex = mail.selectedOptionIndex
                var selectedOption = options[selectedOptionIndex]

                var optionNode = cc.instantiate(this.mailOptionNodePrefab)
                var labelNode = optionNode.getChildByName("label")
                // labelNode.getComponent(cc.Label).string = selectedOption.showText
                labelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(selectedOption.showTextId)
                
                labelNode.color = cc.color(255,255,255)
                var bgNode = optionNode.getChildByName("bg_readed")
                bgNode.active = true
                bgNode.height = labelNode.height

                optionNode.width = bgNode.width
                optionNode.height = bgNode.height
                optionSection.height += optionNode.height
                optionNode.getComponent(cc.Button).interactable = false
                optionNode.y = -(optionSection.height - optionNode.height)
                optionSection.addChild(optionNode)

                var okOptionNode = cc.instantiate(this.mailOptionNodePrefab)
                var okLabelNode = okOptionNode.getChildByName("label")
                okLabelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(147)
                var okBgNode = okOptionNode.getChildByName("bg")
                okOptionNode.width = okBgNode.width
                okOptionNode.height = okBgNode.height
                optionSection.height += okOptionNode.height + this.disOfOptionNodes
                var self = this
                okOptionNode.on("click",function(){
                    self.close()
                })
                okOptionNode.y = -(optionSection.height - okOptionNode.height)
                optionSection.addChild(okOptionNode)
            }

            else {
                var okOptionNode = cc.instantiate(this.mailOptionNodePrefab)
                var okLabelNode = okOptionNode.getChildByName("label")
                okLabelNode.getComponent(cc.Label).string = textConfig.getTextByIdAndLanguageType(147)
                var okBgNode = okOptionNode.getChildByName("bg")
                okOptionNode.width = okBgNode.width
                okOptionNode.height = okBgNode.height
                optionSection.height += okOptionNode.height
                var self = this
                okOptionNode.on("click",function(){
                    self.close()
                })
                okOptionNode.y = -(optionSection.height - okOptionNode.height)
                optionSection.addChild(okOptionNode)
            }
        }
        
    },

    setupUiBg() {
        var uibg = this.node.getChildByName("others").getChildByName("uibg")
        var contentSection = this.node.getChildByName("others").getChildByName("contentSection")
        var optionSection = this.node.getChildByName("others").getChildByName("optionSection")

        uibg.height = this.headerHeight + contentSection.height + this.disOfContentAndOptionSection + optionSection.height + this.footerHeight
        contentSection.y = uibg.height/2 - this.headerHeight
        optionSection.y = contentSection.y - contentSection.height - this.disOfContentAndOptionSection
    }
    // update (dt) {},
});
