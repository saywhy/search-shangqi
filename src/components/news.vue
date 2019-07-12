<template>
    <div class="news">
        <div class="top">
            <div class="top_left">
                <img src="../common/image/logo.png" alt="">
            </div>
        </div>
        <div class="content">
            <div class="title">
                <p class="title_name">{{info_news.title}}</p>
                <p class="title_time">{{info_news.updated_at*1000 | datefrm}}</p>
                <p class="title_content">{{info_news.content}}</p>
            </div>
        </div>
    </div>
</template>
<style  lang="less">
.news {
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
  }
  .content {
    padding: 86px 48px;
    position: relative;
    .title {
      margin-top: 20px;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      padding: 18px 18px 50px 18px;
      .title_name {
        text-align: left;
        font-weight: 500;
        font-size: 20px;
        height: 40px;
        line-height: 40px;
      }
      .title_time {
        text-align: left;
        font-size: 14px;
        height: 60px;
        color: #666;
        line-height: 60px;
        border-bottom: 1px solid #eee;
      }
      .title_content {
        padding-top: 20px;
        text-align: left;
        color: #333;
        font-size: 16px;
        text-indent: 2em;
        letter-spacing: 2px;
        line-height: 30px;
      }
    }
  }
}
</style>
<script>
import moment from 'moment';
export default {
    name: 'news',
    data() {
        return {
            info_news: {}
        }
    },
    filters: {
        datefrm: function (el) {
            return moment(el).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    created() {
    },
    mounted() {
        console.log(JSON.parse(this.$route.query.shopid));
        this.info_news = JSON.parse(this.$route.query.shopid);
    },
    methods: {

    }
}
</script>


