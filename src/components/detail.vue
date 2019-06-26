<template>
    <div class="detail">
        <div class="top">
            <div class="top_left">
                <img src="../common/image/logo.png" alt="">
            </div>
            <div class="top_right">
                <input type="text" class="top_right_input" v-model="detail_search" placeholder="请输入IP、URL、域名、HASH">
                <button class="top_right_button" @click="detail_search_btn">
                    <img src="../common/image/search_icon.png" alt="">
                </button>
            </div>
        </div>
        <div class="content">
            <p class="content_title">
                <span>
                    <router-link to='home'>
                        <span style=" cursor: pointer;">
                            情报查询
                        </span>
                    </router-link>
                    > 威胁详情
                </span>
            </p>
            <div class="mid">
                <div class="mid_top">
                    <div class="mid_top_left">
                        <span class="mid_top_span">{{res_detail.indicator}}</span>
                    </div>
                    <button class="mid_top_btn" v-if="false">
                        扩展查询
                    </button>
                </div>
                <div class="mid_bom">
                    <el-row class="mid_bom_content">
                        <el-col :span="8">
                            <p class="mid_bom_content_p">
                                <img src="../common/image/local.png" alt="">
                                <span class="mid_bom_content_title">地理位置：</span>
                                <span :title="res_detail.geo">{{res_detail.geo}}</span>
                            </p>
                            <p class="mid_bom_content_p">
                                <img src="../common/image/xin.png" alt="">
                                <span class="mid_bom_content_title">置信度：</span>
                                <span>{{res_detail.confidence}}</span>
                            </p>
                        </el-col>
                        <el-col :span="8">
                            <p class="mid_bom_content_p">
                                <img src="../common/image/src.png" alt="">
                                <span class="mid_bom_content_title">情报来源：</span>
                                <span v-for="(item,index) in res_detail.sources" v-if="index==0">
                                    <span>{{item}}</span>
                                </span>
                            </p>
                            <p class="mid_bom_content_p">
                                <img src="../common/image/f_time.png" alt="">
                                <span class="mid_bom_content_title">首次发现时间：</span>
                                <span>{{res_detail.hoohoolab_first_seen }}</span>
                            </p>
                        </el-col>
                        <el-col :span="8">
                            <p class="mid_bom_content_p">
                                <img src="../common/image/local.png" alt="">
                                <span class="mid_bom_content_title">威胁类型：</span>
                                <span>{{res_detail.category }}</span>
                            </p>
                            <p class="mid_bom_content_p">
                                <img src="../common/image/l_time.png" alt="">
                                <span class="mid_bom_content_title">最近发现时间：</span>
                                <span>{{res_detail.hoohoolab_last_seen }}</span>
                            </p>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="bottom_top_title">
                <p>关联信息</p>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="whois信息" name="first" class="first">
                        <ul>
                            <li class="tab_li" v-for="item in whois_info">
                                <span class="whois_title">{{item.name}}</span>
                                <span class="whois_value">{{item.value}}</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="关联样本" name="second" class="second">
                        <table class="table table-hover ng-cloak">
                            <tr style="font-size: 16px;color: #333;">
                                <th style="font-weight: normal;">THREAT</th>
                                <th style="font-weight: normal;">MD5</th>
                                <th style="font-weight: normal;">SHA1</th>
                                <th style="font-weight: normal;">SHA256</th>
                            </tr>
                            <tr v-for="item in res_detail.hoohoolab_files" style="font-size: 14px;color: #666666;">
                                <td :title="item.threat">{{item.threat}}</td>
                                <td :title="item.MD5">{{item.MD5}}</td>
                                <td :title="item.SHA1">{{item.SHA1}}</td>
                                <td :title="item.SHA256">{{item.SHA256}}</td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="关联域名" name="third" class="third">
                        <ul>
                            <li class="tab_li">
                                {{res_detail.hoohoolab_domains}}
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<style  lang="less">
.detail {
  color: #000;
  width: 100%;
  height: 100%;
  background: rgb(248, 248, 248);
  .top {
    height: 86px;
    width: 100%;
    background: #fff;
    padding: 0 48px;
    position: fixed;
    z-index: 999;
    .top_left {
      float: left;
      position: relative;
      height: 86px;
      width: 142px;
      img {
        height: 48px;
        width: 142px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
    .top_right {
      float: right;
      width: 502px;
      position: absolute;
      top: 50%;
      right: 48px;
      transform: translateY(-50%);
      .top_right_input {
        float: left;
        width: 450px;
        height: 42px;
        border: 1px solid #0070ff;
        border-radius: 4px;
        padding-left: 16px;
        font-size: 14px;
      }
      input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #bbb;
      }
      .top_right_button {
        cursor: pointer;
        border-radius: 0 4px 4px 0;
        margin-left: -3px;
        border: 1px;
        float: left;
        width: 52px;
        height: 42px;
        background: #0070ff;
      }
    }
  }
  .content {
    padding: 86px 48px;
    position: relative;
    .content_title {
      position: absolute;
      top: 120px;
      color: #888;
      font-size: 16px;
    }
    .mid {
      margin-top: 82px;
      height: 184px;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      .mid_top {
        height: 68px;
        border-bottom: 1px solid #ececec;
        padding: 0 24px;
        position: relative;
        .mid_top_left {
          float: left;
          height: 30px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          .mid_top_span {
            font-size: 20px;
            color: #333333;
            font-weight: 700;
          }
        }
        .mid_top_btn {
          background: #0070ff;
          font-size: 14px;
          right: 24px;
          border-radius: 4px;
          height: 42px;
          width: 124px;
          color: #fff;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .mid_bom_content {
        .mid_bom_content_p {
          height: 56px;
          line-height: 56px;
          text-align: left;
          padding-left: 26px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .mid_bom_content_title {
          font-size: 16px;
          color: #649ee9;
        }
      }
    }
    .bottom_top_title {
      height: 80px;
      font-size: 20px;
      color: #333333;
      text-align: left;
      line-height: 80px;
      font-weight: 500;
    }
    .bottom {
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      text-align: center;
      .whois_title {
        display: inline-block;
        width: 180px;
        font-size: 16px;
        color: #333333;
      }
      .whois_value {
        font-size: 14px;
        color: #666666;
      }
      .el-tabs__nav {
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        color: #333333;
      }
      ul {
        text-align: left;
      }
      .el-tabs__header {
        padding: 0;
        position: relative;
        background: #eef6ff;
        margin: 0;
      }
      .el-tabs__nav-wrap {
        padding-left: 26px;
      }
      .tab_li,
      tr {
        height: 48px;
        line-height: 48px;
        padding-left: 26px;
      }
      table tr:nth-child(odd),
      .first li:nth-child(odd),
      .second li:nth-child(odd),
      .third li:nth-child(odd) {
        background: #fff;
      }
      table tr:nth-child(even),
      .first li:nth-child(even),
      .second li:nth-child(even),
      .third li:nth-child(even) {
        background: #eef6ff;
      }

      .el-tabs__content {
        min-height: 100px;
      }
      table {
        width: 100%;
        table-layout: fixed;
      }
      td,
      th {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
  }
}
</style>
<script>
export default {
    name: 'detail',
    data() {
        return {
            detail_search: '',
            activeName: 'first',
            res_detail: {},
            whois_info: [],
        }
    },
    mounted() {
        console.log(JSON.parse(this.$route.query.shopid));
        if (this.$route.query.shopid) {
            if (JSON.parse(this.$route.query.shopid).hoohoolab_ip_whois) {
                for (var k in JSON.parse(this.$route.query.shopid).hoohoolab_ip_whois) {
                    var obj = {};
                    if (
                        JSON.parse(this.$route.query.shopid).sources[0].indexOf("IPReputation") != -1
                    ) {
                        switch (k) {
                            //   IP Reputation
                            case "net_range":
                                obj.name = "网络地址范围";
                                break;
                            case "net_name":
                                obj.name = "网络名称";
                                break;
                            case "descr":
                                obj.name = "网络描述";
                                break;
                            case "created":
                                obj.name = "网络注册时间";
                                break;
                            case "updated":
                                obj.name = "网络更新时间";
                                break;
                            case "country":
                                obj.name = "网络注册的国家";
                                break;
                            case "contact_owner_name":
                                obj.name = "网络所有者名称";
                                break;
                            case "contact_owner_code":
                                obj.name = "网络所有者编码";
                                break;
                            case "contact_owner_country":
                                obj.name = "网络所有者国家";
                                break;
                            case "contact_owner_country":
                                obj.name = "网络所有者国家";
                                break;
                            case "contact_owner_city":
                                obj.name = "网络所有者城市";
                                break;
                            case "contact_owner_email":
                                obj.name = "网络所有者邮箱";
                                break;
                            case "contact_abuse_name":
                                obj.name = "滥用报告接口人";
                                break;
                            case "contact_abuse_email":
                                obj.name = "滥用报告邮箱";
                                break;
                            case "asn":
                                obj.name = "自主系统号（ASN）";
                                break;
                            default:
                                obj.name = k;
                                break;
                        }
                    } else {
                        switch (k) {
                            // Malicious URL whois
                            // Phishing URL
                            case "domain":
                                obj.name = "域名";
                                break;
                            case "created":
                                obj.name = "域名注册时间";
                                break;
                            case "updated":
                                obj.name = "域名更新时间";
                                break;
                            case "expires":
                                obj.name = "域名过期时间";
                                break;
                            case "name":
                                obj.name = "注册人名称";
                                break;
                            case "org":
                                obj.name = "注册人组织";
                                break;
                            case "country":
                                obj.name = "注册人国家";
                                break;
                            case "city":
                                obj.name = "注册人城市";
                                break;
                            case "email":
                                obj.name = "注册人邮箱";
                                break;
                            case "email":
                                obj.name = "注册人邮箱";
                                break;
                            case "registrar_name":
                                obj.name = "注册机构名称";
                                break;
                            case "registrar_email":
                                obj.name = "注册机构邮箱";
                                break;
                            case "NS":
                                obj.name = "域名服务器";
                                break;
                            case "NS_ips":
                                obj.name = "域名服务器IP";
                                break;
                            case "MX":
                                obj.name = "邮件服务器";
                                break;
                            case "MX_ips":
                                obj.name = "邮件服务器IP";
                                break;
                            default:
                                obj.name = k;
                                break;
                        }
                    }
                    obj.value = JSON.parse(this.$route.query.shopid).hoohoolab_ip_whois[k];
                    this.whois_info.push(obj)
                }
            }
            this.res_detail = JSON.parse(this.$route.query.shopid);
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        detail_search_btn() {
            if (this.detail_search == '') {
            } else {
                // this.$axios.get('https://47.105.196.251/site/reputation', {
                this.$axios.get('/site/reputation', {
                    params: {
                        indicator: this.detail_search
                        // indicator: '185.234.217.139'
                    },
                }
                )
                    .then(response => {
                        this.whois_info = [];
                        this.res_detail = {};
                        if (response.data.status == "success") {
                            if (response.data.data.result.hoohoolab_ip_whois) {
                                for (var k in response.data.data.result.hoohoolab_ip_whois) {
                                    var obj = {};
                                    if (
                                        response.data.data.result.sources[0].indexOf("IPReputation") != -1
                                    ) {
                                        switch (k) {
                                            //   IP Reputation
                                            case "net_range":
                                                obj.name = "网络地址范围";
                                                break;
                                            case "net_name":
                                                obj.name = "网络名称";
                                                break;
                                            case "descr":
                                                obj.name = "网络描述";
                                                break;
                                            case "created":
                                                obj.name = "网络注册时间";
                                                break;
                                            case "updated":
                                                obj.name = "网络更新时间";
                                                break;
                                            case "country":
                                                obj.name = "网络注册的国家";
                                                break;
                                            case "contact_owner_name":
                                                obj.name = "网络所有者名称";
                                                break;
                                            case "contact_owner_code":
                                                obj.name = "网络所有者编码";
                                                break;
                                            case "contact_owner_country":
                                                obj.name = "网络所有者国家";
                                                break;
                                            case "contact_owner_country":
                                                obj.name = "网络所有者国家";
                                                break;
                                            case "contact_owner_city":
                                                obj.name = "网络所有者城市";
                                                break;
                                            case "contact_owner_email":
                                                obj.name = "网络所有者邮箱";
                                                break;
                                            case "contact_abuse_name":
                                                obj.name = "滥用报告接口人";
                                                break;
                                            case "contact_abuse_email":
                                                obj.name = "滥用报告邮箱";
                                                break;
                                            case "asn":
                                                obj.name = "自主系统号（ASN）";
                                                break;
                                            default:
                                                obj.name = k;
                                                break;
                                        }
                                    } else {
                                        switch (k) {
                                            // Malicious URL whois
                                            // Phishing URL
                                            case "domain":
                                                obj.name = "域名";
                                                break;
                                            case "created":
                                                obj.name = "域名注册时间";
                                                break;
                                            case "updated":
                                                obj.name = "域名更新时间";
                                                break;
                                            case "expires":
                                                obj.name = "域名过期时间";
                                                break;
                                            case "name":
                                                obj.name = "注册人名称";
                                                break;
                                            case "org":
                                                obj.name = "注册人组织";
                                                break;
                                            case "country":
                                                obj.name = "注册人国家";
                                                break;
                                            case "city":
                                                obj.name = "注册人城市";
                                                break;
                                            case "email":
                                                obj.name = "注册人邮箱";
                                                break;
                                            case "email":
                                                obj.name = "注册人邮箱";
                                                break;
                                            case "registrar_name":
                                                obj.name = "注册机构名称";
                                                break;
                                            case "registrar_email":
                                                obj.name = "注册机构邮箱";
                                                break;
                                            case "NS":
                                                obj.name = "域名服务器";
                                                break;
                                            case "NS_ips":
                                                obj.name = "域名服务器IP";
                                                break;
                                            case "MX":
                                                obj.name = "邮件服务器";
                                                break;
                                            case "MX_ips":
                                                obj.name = "邮件服务器IP";
                                                break;
                                            default:
                                                obj.name = k;
                                                break;
                                        }
                                    }
                                    obj.value = response.data.data.result.hoohoolab_ip_whois[k];
                                    this.whois_info.push(obj)
                                }
                            }
                            this.res_detail = response.data.data.result
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
}
</script>


