<template>
  <div class="home"
       v-loading.fullscreen.lock="loading"
       v-loading="btn_loading">
    <div class="log_box">
      <img src="../common/image/logo.png"
           class="logo"
           alt="">
    </div>
    <div class="input_box">
      <span class="tag">
        信誉情报
      </span>
      <input type="text"
             v-model="search.indicator"
             placeholder="请输入IP、URL、域名、HASH"
             class="search_input">
      <button class="input_btn"
              @click="search_btn">
        <img src="../common/image/search_icon.png"
             alt="">
      </button>
    </div>
    <div class="swiper_box">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="item in news_array"
               @click="silder_click(item)">
            <div class="swiper_img">
              <img :src="item.raw_picture"
                   alt="">
            </div>
            <p class="swiper_p_tilte">
              {{item.title}}
            </p>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <el-button :plain="true"
               @click="open4"
               v-if="false">错误</el-button>

    <div class="foot">
      <img src="../common/image/c.png"
           alt="">
      <span>2019 上海汽车集团股份有限公司</span>
      <!-- <span>2019 上海工业控制安全创新科技有限公司</span> -->
    </div>
  </div>
</template>
<style  lang="less">
.home {
  color: #000;
  height: 100%;
  min-height: 1080px;
  background: rgb(248, 248, 248);
  padding-top: 100px;
  padding-bottom: 100px;
  position: relative;
  .foot {
    width: 100%;
    height: 70px;
    border-top: 1px solid #ececec;
    //    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 14px;
    color: #999999;
    line-height: 70px;
    text-align: center;
    img {
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .log_box {
    margin: 0px 0 72px 0;
    .logo {
      width: 480px;
      height: 204px;
    }
  }

  .input_box {
    position: relative;
    height: 64px;
    width: 820px;
    margin: 0 auto;
    .tag {
      position: absolute;
      top: -40px;
      display: block;
      width: 98px;
      height: 42px;
      background: #0070ff;
      border-radius: 4px 4px 0 0;
      border: 2px;
      color: #fff;
      line-height: 42px;
      font-size: 14px;
    }
    .search_input {
      height: 64px;
      width: 748px;
      background: #fff;
      border: 2px solid #0070ff;
      border-radius: 4px 0 0 4px;
      float: left;
      font-size: 16px;
      padding-left: 12px;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #bbb;
    }
    .input_btn {
      width: 72px;
      height: 64px;
      background: #0070ff;
      float: left;
      margin-left: -2px;
      border: 2px;
      cursor: pointer;
      border-radius: 0 3px 3px 0;
    }
  }
  .swiper_box {
    width: 100%;
    height: 300px;
    margin-top: 72px;
  }
  .swiper-container {
    padding-top: 10px;
    width: 1272px;
    height: 280px;
    margin: 0 auto;
  }
  .swiper-slide {
    cursor: pointer;
    width: 288px;
    height: 210px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    .swiper_img {
      height: 142px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px 6px 0 0;
      }
    }
    .swiper_p_tilte {
      padding: 15px;
      font-size: 14px;
      color: #333333;
      text-align: left;
    }
  }
}

.el-button:focus,
.el-button:hover {
}
.el-message-box__wrapper {
  .el-message-box {
    .el-message-box__btns {
      .el-button--default {
        &:hover {
          background: #fff;
          border: 1px solid #dcdfe6;
          color: #606266;
        }
        &.el-button--primary {
          background-color: #0070ff;
          border-color: #0070ff;
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
import Swiper from "swiper";
export default {
  name: "home",
  data () {
    return {
      loading: false,
      btn_loading: false,
      search: {
        indicator: ""
      },
      news_array: []
    };
  },
  created () {
    var _this = this;
    document.onkeydown = function (e) {
      // 兼容FF和IE和Opera
      var theEvent = e || window.event;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13) {
        //回车执行查询
        _this.search_btn();
      }
    };
  },
  mounted () {
    this.get_new();
  },
  methods: {
    get_new () {
      // this.$axios
      // .get("https://47.105.196.251:8443/site/safety-news")
      this.$axios
        .get("/site/safety-news")
        .then(response => {
          if (response.data.status == "success") {
            this.news_array = response.data.data;
            this.initSwiper();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initSwiper () {
      this.$nextTick(() => {
        var swiper = new Swiper(".swiper-container", {
          autoplay: {
            disableOnInteraction: false
          }, //可选选项，自动滑动
          loop: true,
          speed: 1000,
          spaceBetween: 30,
          slidesPerView: 4,
          slidesPerGroup: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dragSize: 30
            // type: 'progress',
          }
        });
      });
    },
    silder_click (item) {
      console.log(item);
      this.$router.push({
        path: "/news",
        // query: { shopid: JSON.stringify(item) }
      });
      sessionStorage.setItem("news", JSON.stringify(item));
    },
    open4 () {
      this.$message.warning('没有搜索到信誉情报详情');
    },
    search_btn () {
      if (this.search.indicator == '') {
      } else {
        /*   this.$axios
             .get("https://47.105.196.251/site/reputation", {*/
        this.btn_loading = true;
        this.$axios
          .get('/site/reputation', {
            params: {
              indicator: this.search.indicator
              // indicator: '185.234.217.139'
            }
          })
          .then(response => {
            console.log(response);
            this.btn_loading = false;
            if (response.data.status == "success") {
              if (response.data.data.result == null) {
                //this.open4();

                this.$confirm('本地信誉库未查到该情报记录,可进行扩展查询', '', {
                  distinguishCancelAndClose: true,
                  confirmButtonText: '扩展查询',
                  cancelButtonText: '取消'
                })
                  .then(() => {
                    this.loading = true;
                    this.$axios
                      .get('/site/extension', {
                        params: {
                          indicator: this.search.indicator
                        }
                      })
                      .then((resp) => {
                        this.loading = false;
                        console.log('***')
                        console.log(resp)

                        let obj = this.search.indicator;

                        if (resp.data.data == null) {
                          this.$message.warning("没有查询到扩展信息");
                          return false;
                        }
                        if (resp.data.data.result == null) {
                          this.$message.warning("没有查询到扩展信息");
                          return false;
                        }

                        for (var k in resp.data.data.result) {
                          switch (k) {
                            case "DomainGeneralInfo":
                              //   window.location.href = "/ExtendedQuery.html#/domain?name=" + obj;
                              sessionStorage.setItem("DomainGeneralInfo", JSON.stringify(resp.data.data));
                              window.open("/ExtendedQuery.html#/domain?name=" + obj);
                              break;
                            case "FileGeneralInfo":
                              //   window.location.href = "/ExtendedQuery.html#/hash?name=" + obj;
                              sessionStorage.setItem("FileGeneralInfo", JSON.stringify(resp.data.data));
                              window.open("/ExtendedQuery.html#/hash?name=" + obj);
                              break;
                            case "IpGeneralInfo":
                              sessionStorage.setItem("IpGeneralInfo", JSON.stringify(resp.data.data));
                              //   window.location.href = "/ExtendedQuery.html#/ip?name=" + obj;
                              window.open("/ExtendedQuery.html#/ip?name=" + obj);
                              break;
                            case "UrlGeneralInfo":
                              sessionStorage.setItem("UrlGeneralInfo", JSON.stringify(resp.data.data));
                              //   window.location.href = "/ExtendedQuery.html#/url?name=" + obj;
                              window.open("/ExtendedQuery.html#/url?name=" + obj);
                              break;
                            default:
                              break;
                          }
                        }
                      })
                  })
                  .catch(action => {
                    this.$message({
                      type: 'info',
                      message: '取消扩展查询'
                    })
                  });
              } else {
                this.$router.push({
                  path: '/detail',
                  // query: { shopid: JSON.stringify(response.data.data.result) }
                });
                sessionStorage.setItem("detail", JSON.stringify(response.data.data.result));
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

