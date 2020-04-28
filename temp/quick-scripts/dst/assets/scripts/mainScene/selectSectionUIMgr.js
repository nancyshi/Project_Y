
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/mainScene/selectSectionUIMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2250CWPMpIRr7o+jf81yog', 'selectSectionUIMgr');
// scripts/mainScene/selectSectionUIMgr.js

"use strict";

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
  "extends": cc.Component,
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
    containerContentNode: cc.Node,
    closeButtonNode: cc.Node,
    bgNode: cc.Node,
    othersNode: cc.Node,
    elementPrefab: cc.Prefab,
    elementDis: 100
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.setupUI();
  },
  setupUI: function setupUI() {
    this.bgNode.width = cc.winSize.width;
    this.bgNode.height = cc.winSize.height;
    this.bgNode.on("touchstart", function () {
      require("systemsMgr").closeSystem("selectSectionSys");
    });
    this.closeButtonNode.on("click", function () {
      require("systemsMgr").closeSystem("selectSectionSys");
    });

    var sectionConfig = require("sectionConfig");

    var contentHeight = 0;

    for (var key in sectionConfig) {
      var node = cc.instantiate(this.elementPrefab);
      var mgr = node.getComponent("selectSectionElementMgr");
      mgr.sectionKey = key;
      mgr.selectSectionUINode = this.node;
      node.y = contentHeight;
      contentHeight += node.height;
      contentHeight += this.elementDis;
      this.containerContentNode.addChild(node);
    }

    if (this.containerContentNode.height < contentHeight) {
      this.containerContentNode.height = contentHeight;
    }
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL21haW5TY2VuZS9zZWxlY3RTZWN0aW9uVUlNZ3IuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjb250YWluZXJDb250ZW50Tm9kZSIsIk5vZGUiLCJjbG9zZUJ1dHRvbk5vZGUiLCJiZ05vZGUiLCJvdGhlcnNOb2RlIiwiZWxlbWVudFByZWZhYiIsIlByZWZhYiIsImVsZW1lbnREaXMiLCJzdGFydCIsInNldHVwVUkiLCJ3aWR0aCIsIndpblNpemUiLCJoZWlnaHQiLCJvbiIsInJlcXVpcmUiLCJjbG9zZVN5c3RlbSIsInNlY3Rpb25Db25maWciLCJjb250ZW50SGVpZ2h0Iiwia2V5Iiwibm9kZSIsImluc3RhbnRpYXRlIiwibWdyIiwiZ2V0Q29tcG9uZW50Iiwic2VjdGlvbktleSIsInNlbGVjdFNlY3Rpb25VSU5vZGUiLCJ5IiwiYWRkQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxvQkFBb0IsRUFBRUosRUFBRSxDQUFDSyxJQWhCakI7QUFpQlJDLElBQUFBLGVBQWUsRUFBRU4sRUFBRSxDQUFDSyxJQWpCWjtBQWtCUkUsSUFBQUEsTUFBTSxFQUFFUCxFQUFFLENBQUNLLElBbEJIO0FBbUJSRyxJQUFBQSxVQUFVLEVBQUVSLEVBQUUsQ0FBQ0ssSUFuQlA7QUFvQlJJLElBQUFBLGFBQWEsRUFBRVQsRUFBRSxDQUFDVSxNQXBCVjtBQXNCUkMsSUFBQUEsVUFBVSxFQUFFO0FBdEJKLEdBSFA7QUE0Qkw7QUFFQTtBQUVBQyxFQUFBQSxLQWhDSyxtQkFnQ0k7QUFDTCxTQUFLQyxPQUFMO0FBQ0gsR0FsQ0k7QUFvQ0xBLEVBQUFBLE9BcENLLHFCQW9DSztBQUNOLFNBQUtOLE1BQUwsQ0FBWU8sS0FBWixHQUFvQmQsRUFBRSxDQUFDZSxPQUFILENBQVdELEtBQS9CO0FBQ0EsU0FBS1AsTUFBTCxDQUFZUyxNQUFaLEdBQXFCaEIsRUFBRSxDQUFDZSxPQUFILENBQVdDLE1BQWhDO0FBQ0EsU0FBS1QsTUFBTCxDQUFZVSxFQUFaLENBQWUsWUFBZixFQUE0QixZQUFVO0FBQ2xDQyxNQUFBQSxPQUFPLENBQUMsWUFBRCxDQUFQLENBQXNCQyxXQUF0QixDQUFrQyxrQkFBbEM7QUFDSCxLQUZEO0FBSUEsU0FBS2IsZUFBTCxDQUFxQlcsRUFBckIsQ0FBd0IsT0FBeEIsRUFBZ0MsWUFBVTtBQUN0Q0MsTUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQUFzQkMsV0FBdEIsQ0FBa0Msa0JBQWxDO0FBQ0gsS0FGRDs7QUFJQSxRQUFJQyxhQUFhLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTNCOztBQUNBLFFBQUlHLGFBQWEsR0FBRyxDQUFwQjs7QUFDQSxTQUFLLElBQUlDLEdBQVQsSUFBZ0JGLGFBQWhCLEVBQStCO0FBQzNCLFVBQUlHLElBQUksR0FBR3ZCLEVBQUUsQ0FBQ3dCLFdBQUgsQ0FBZSxLQUFLZixhQUFwQixDQUFYO0FBQ0EsVUFBSWdCLEdBQUcsR0FBR0YsSUFBSSxDQUFDRyxZQUFMLENBQWtCLHlCQUFsQixDQUFWO0FBQ0FELE1BQUFBLEdBQUcsQ0FBQ0UsVUFBSixHQUFpQkwsR0FBakI7QUFDQUcsTUFBQUEsR0FBRyxDQUFDRyxtQkFBSixHQUEwQixLQUFLTCxJQUEvQjtBQUVBQSxNQUFBQSxJQUFJLENBQUNNLENBQUwsR0FBU1IsYUFBVDtBQUNBQSxNQUFBQSxhQUFhLElBQUlFLElBQUksQ0FBQ1AsTUFBdEI7QUFDQUssTUFBQUEsYUFBYSxJQUFJLEtBQUtWLFVBQXRCO0FBQ0EsV0FBS1Asb0JBQUwsQ0FBMEIwQixRQUExQixDQUFtQ1AsSUFBbkM7QUFDSDs7QUFFRCxRQUFJLEtBQUtuQixvQkFBTCxDQUEwQlksTUFBMUIsR0FBbUNLLGFBQXZDLEVBQXNEO0FBQ2xELFdBQUtqQixvQkFBTCxDQUEwQlksTUFBMUIsR0FBbUNLLGFBQW5DO0FBQ0g7QUFDSixHQWhFSSxDQWlFTDs7QUFqRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBjb250YWluZXJDb250ZW50Tm9kZTogY2MuTm9kZSxcbiAgICAgICAgY2xvc2VCdXR0b25Ob2RlOiBjYy5Ob2RlLFxuICAgICAgICBiZ05vZGU6IGNjLk5vZGUsXG4gICAgICAgIG90aGVyc05vZGU6IGNjLk5vZGUsXG4gICAgICAgIGVsZW1lbnRQcmVmYWI6IGNjLlByZWZhYixcblxuICAgICAgICBlbGVtZW50RGlzOiAxMDBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBVSSgpXG4gICAgfSxcblxuICAgIHNldHVwVUkoKSB7XG4gICAgICAgIHRoaXMuYmdOb2RlLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aFxuICAgICAgICB0aGlzLmJnTm9kZS5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodFxuICAgICAgICB0aGlzLmJnTm9kZS5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmVxdWlyZShcInN5c3RlbXNNZ3JcIikuY2xvc2VTeXN0ZW0oXCJzZWxlY3RTZWN0aW9uU3lzXCIpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbk5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXF1aXJlKFwic3lzdGVtc01nclwiKS5jbG9zZVN5c3RlbShcInNlbGVjdFNlY3Rpb25TeXNcIilcbiAgICAgICAgfSlcblxuICAgICAgICB2YXIgc2VjdGlvbkNvbmZpZyA9IHJlcXVpcmUoXCJzZWN0aW9uQ29uZmlnXCIpXG4gICAgICAgIHZhciBjb250ZW50SGVpZ2h0ID0gMFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VjdGlvbkNvbmZpZykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVsZW1lbnRQcmVmYWIpXG4gICAgICAgICAgICB2YXIgbWdyID0gbm9kZS5nZXRDb21wb25lbnQoXCJzZWxlY3RTZWN0aW9uRWxlbWVudE1nclwiKVxuICAgICAgICAgICAgbWdyLnNlY3Rpb25LZXkgPSBrZXlcbiAgICAgICAgICAgIG1nci5zZWxlY3RTZWN0aW9uVUlOb2RlID0gdGhpcy5ub2RlXG5cbiAgICAgICAgICAgIG5vZGUueSA9IGNvbnRlbnRIZWlnaHRcbiAgICAgICAgICAgIGNvbnRlbnRIZWlnaHQgKz0gbm9kZS5oZWlnaHRcbiAgICAgICAgICAgIGNvbnRlbnRIZWlnaHQgKz0gdGhpcy5lbGVtZW50RGlzXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRlbnROb2RlLmFkZENoaWxkKG5vZGUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXJDb250ZW50Tm9kZS5oZWlnaHQgPCBjb250ZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRlbnROb2RlLmhlaWdodCA9IGNvbnRlbnRIZWlnaHRcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19