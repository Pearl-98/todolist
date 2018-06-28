<template>
  <div  class="bgtable">
    <div class="table_form">
      <form class="form-signin">
        <h3>Please sign in</h3>
        <input type="text" id="inputUser" class="form-control" placeholder="User Name" v-model="userInfo.userName" required autofocus>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="userInfo.password" required>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"><strong>Remember me</strong>
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click="login">Sign in</button>
        <p class="text-muted">&copy; 2017-2018</p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
    name: 'hello',
    data(){
        return {
            vuegConfig:{
                forwardAnim:this.$store.state.page3.forwardAnim,
                backAnim: this.$store.state.page3.backAnim,
                duration: this.$store.state.page3.duration
            },
          userInfo:{
                userName:'',
                password:''
          }
        }
    },
    mounted() {
        // 在page3中修改了config，这里做恢复
        this.$store.commit('setState', {
            key: 'page3',
            value: {
                forwardAnim: 'lightSpeedIn',
                duration: '0.4',
                backAnim: 'lightSpeedOut'
            }
        })
    },
    methods: {
      login(){
          let that = this;
        fetch(
          "/login/"+JSON.stringify(this.userInfo)
        )
          .then(function(res) {
            localStorage.setItem("userInfo", JSON.stringify(that.userInfo));
            that.$router.push(
              { name: 'page1',
                params: { 
                  //userInfo: this.userInfo
                }
              })
          }, function(e) {
            console.log("Fetch failed!", e);
          });
      }
    }
}
</script>

<style scoped>
  .bgtable{
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    background:url('../images/road.jpg') no-repeat center;
    background-size: cover;

  }
  .table_form{
    opacity: 0.8;
    width:300px;
    margin:0 auto;
  }
  .form-signin {
    width: 100%;
    padding: 15px;
    margin: 0 auto;
    text-align: center;
  }
  .form-signin.checkbox {
    font-weight: 400;
  }
  .form-signin.form-control {
    position:relative;
    height: auto;
    padding:10px;
    font-size:16px;
  }
  .form-signin.form-control:focus{
    z-index: 2;
  }
  .form-signin input[type="text"] {
    margin-bottom: 2px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

</style>
