<template>
    <section class="secondPage">
        <div class="mainContainer">
          <div class="leftContainer">
            <div class="title">
              <div class="userInfoPart">
                <div class="userIcon"></div>
                <div class="userNamePart">
                  <div class="userName">{{userInfo.userName}}</div>
                  <button class="btn btn-default userNameButton" @click="logout">注销</button>
                </div>
              </div>
              <div class="form-table">
                <form class="navbar-form navbar-left" role="search" style="margin-left:50px;flex:1">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search" v-model="key">
                  </div>
                  <div class="glyphicon glyphicon-search form-div1" v-if="unbind" @click="searchMission"></div>
                </form>
                <div class="glyphicon glyphicon-asterisk form-div2" @click="changeTheme()"></div>
              </div>
            </div>
            <ul class="list-group todolist-item" v-for="(data,index) in menuList">
              <li class="list-group-item" @click.capture="expand(index)">
                <!--.capture是js事件的监听器-->
                {{data.menuName}}
              </li>
              <li class="list-group-item grouplist-item" v-for="(one,index2) in data.children" v-if="data.expandFlag">
                <div class="glyphicon glyphicon-tasks"></div>
                <div style="margin-left: 10px;flex:1" @dblclick="startChange(index,index2)" @click="showList(one)" v-if="!one.editFlag">{{one.childName}}</div>
                <input style="margin-left: 10px;flex:1" v-model="one.childName" @blur="saveChange(index,index2)" v-if="one.editFlag">
                <span class="badge">{{data.msgNum}}</span>
                <div class="glyphicon glyphicon-ok item-ok"></div>
                <div class="glyphicon glyphicon-remove item-remove" @click="deleteEvent(index,index2)"></div>
              </li>
              <li class="list-group-item addlist-item" v-if="data.expandFlag && data.editable" @click.stop="addList(index)">
                <div class="glyphicon glyphicon-plus-sign"></div>
                <div style="margin-left: 20px">添加清单</div>
              </li>
            </ul>
          </div>

          <div class="rightContainer" >
              <div class="rightTop" id="rightTop">
                <div class="rightTopTitle">{{eachList.childName}}</div>
              </div>
              <div>
                <div class="rightBottom">
                  <ul class="list-group" v-for="(data,index) in eachList.content" style="margin-bottom: 0;" >
                    <!--unfinished start+sort-->
                    <li class="list-group-item event-item"  :id="'missionType'+index">
                      <div  @click="expandMissionMng(index)" style="cursor: pointer">{{data.name}}</div>
                      <div class="glyphicon glyphicon-sort-by-attributes" style="margin-left: 10px;cursor:pointer" @click="sortIncrease()" v-if="data.type!='done'"></div>
                      <div class="glyphicon glyphicon-sort-by-attributes-alt" style="margin-left: 10px;cursor:pointer" @click="sortDescrease()" v-if="data.type!='done'"></div>
                    </li>
                    <li class="list-group-item disable-item" v-for="(one,index2) in data.children"  v-if="data.expandFlag && one.showFlag">
                      <div style="display: flex;flex-direction: column;flex:1">
                        <div style="margin-left: 10px;flex:1" @dblclick="startEditMission(index,index2)"  v-if="!one.editFlag">{{one.missionName}}</div>
                        <div class="startedit-item" @dblclick="startEditMission(index,index2)"  v-if="!one.editFlag">
                          <div class="glyphicon glyphicon-calendar" style="top:0;"></div>
                          <div>{{ one.missionDate | formatDate }}</div>
                        </div>
                        <!--input eventname+eventdata-->
                        <input class="eventname-item" v-model="one.missionName" @blur="saveMissionData(index,index2,one.missionName)" v-if="one.editFlag">
                        <input type="date" class="eventdata-item" v-model="one.missionDate" @blur="saveMissionData(index,index2,one.missionName)" v-if="one.editFlag">
                        <!--finish input-->
                      </div>
                      <div class="remove-ok-item" v-if="data.type!='done'">
                        <div class="glyphicon glyphicon-ok item-ok" @click="complete(index2)"></div>
                        <div class="glyphicon glyphicon-remove item-remove" @click="deleteMission(index2)"></div>
                      </div>
                    </li>
                    <!--unfinished end-->
                    <li class="list-group-item addevent-item" v-if="data.type!='done' && data.expandFlag " @click.stop="addMission(index)">
                      <div class="glyphicon glyphicon-plus-sign"></div>
                      <div style="margin-left: 20px">添加任务</div>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      <div class="alert alert-warning alert-dismissible" role="alert" id="alert" style="position: absolute;top:0;left:45%">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>Warning!</strong> {{warningInfo}}
      </div>
    </section>
</template>

<script>
export default {
    name: 'page1',
    data() {
        return {
            vuegConfig: {
              forwardAnim: 'touchPoint',
              duration: '.3'
            },
            userInfo:{
                userName:'',
                password:''
            },
            key:'',//搜索关键字
            unbind:true,
            menuList:[
              {
                  menuName:'MyDay',
                  expandFlag:false,
                  editable:false,
                  msgNum:10,
                  children:[
                  ]
              },
              {
                menuName:'TODO',
                expandFlag:false,
                editable:true,
                children:[
                  {
                    childName:'test',
                    msgNum:10,
                    editFlag:false,
                    content:[
                      {
                        type:'todo',
                        name:'尚未完成',
                        expandFlag:true,
                        children:[
                          {
                              missionName:'操作系统实验五',
                              missionDate:new Date(),
                              editFlag:false,
                              showFlag:true
                          }
                        ]
                      },
                      {
                        type:'done',
                        name:'已经完成',
                        expandFlag:false,
                        children:[
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            eachList:{
              childName:'待办事项',
              content:[
              ]
          },
          warningInfo:''//提示信息
        }
    },
    filters:{
      formatDate :function(value){
        var date = new Date(value);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();
        return year+'-'+month+'-'+day;
      }
    },
    methods: {
      logout(){
        localStorage.removeItem("userInfo");
        this.$router.push(
          { name: 'Login',
            params: {

            }
          })
      },
      //查找
      searchMission(){
          if(this.key!=''){
            for(let i=0;i<this.eachList.content[0].children.length;i++){
              if(this.eachList.content[0].children[i].missionName.includes(this.key)){
                this.eachList.content[0].children[i].showFlag = true;
              }else{
                this.eachList.content[0].children[i].showFlag = false;
              }
            }
          }else{
            for(let i=0;i<this.eachList.content[0].children.length;i++){
                this.eachList.content[0].children[i].showFlag = true;
            }
          }
      },
      //改变主题
      changeTheme(){
        let colorList = ['#DB7093','	#6A5ACD','	#5F9EA0','#D2691E	','	#FA8072'];
        let randomColor = colorList[parseInt((Math.random() * 4))];
        document.getElementById('rightTop').style.backgroundColor = randomColor;
        document.getElementById('missionType0').style.backgroundColor = randomColor;
        document.getElementById('missionType1').style.backgroundColor = randomColor;
      },
      //展开清单
      expand(index){
          this.menuList[index].expandFlag =  !this.menuList[index].expandFlag;
      },
      //修改清单名称
      startChange(index,index2){
        this.menuList[index].children[index2].editFlag = true;
      },
      //保存清单名称
      saveChange(index,index2){
        this.menuList[index].children[index2].editFlag = false;
        this.saveData();
      },
      //添加清单
      addList(index){
          let newListChild = {
            childName:'',
            msgNum:null,
            editFlag:true,
            content:[
            {
              type:'todo',
              name:'尚未完成',
              expandFlag:true,
              children:[
              ]
            },
            {
              type:'done',
              name:'已经完成',
              expandFlag:false,
              children:[
              ]
            }
          ]
          }
        this.menuList[index].children.push(newListChild)
      },
      //显示清单
      showList(one){
        this.eachList = one;
      },
      //展开或收缩任务列表
      expandMissionMng(index){
        this.eachList.content[index].expandFlag = !this.eachList.content[index].expandFlag;
      },
      //编辑任务列表
      startEditMission(index,index2){
          if(this.eachList.content[index].type!='done'){
            this.eachList.content[index].children[index2].editFlag = true;
          }
      },
      //升序排序
      sortIncrease(){
          this.eachList.content[0].children.sort(function(a,b){
            return Date.parse(a.missionDate) - Date.parse(b.missionDate);//时间正序
          });
      },
      //降序排序
      sortDescrease(){
          this.eachList.content[0].children.sort(function(a,b){
            return Date.parse(b.missionDate) - Date.parse(a.missionDate);//时间倒序
          });
      },
      //保存编辑
      saveMissionData(index,index2,misstionName){
        this.eachList.content[index].children[index2].editFlag = false;
        this.saveData();
      },
      //待办事项完成
      complete(index2){
          if(this.eachList.content[0].children[index2].missionName=='' || this.eachList.content[0].children[index2].missionDate==''){
            this.warningInfo = '任务名称，时间不能为空'
            $('#alert').show();
              return;
          }
        this.eachList.content[1].children.push(this.eachList.content[0].children[index2]);
        this.eachList.content[0].children.splice(index2,1);
        this.saveData();
      },
      //删除清单
      deleteEvent(index,index2){
        let n=this.menuList[index].children[index2].content[0].children.length;
        for(let i=0;i< n;i++){
          this.menuList[index].children[index2].content[0].children.splice(0,1);
        }
        let m=this.menuList[index].children[index2].content[1].children.length;
        for(let i=0;i< n;i++){
          this.menuList[index].children[index2].content[1].children.splice(0,1);
        }
        this.menuList[index].children.splice(index2,1);
        this.saveData();
      },
    
      //删除待办事项
      deleteMission(index2){
        this.eachList.content[0].children.splice(index2,1);
        this.saveData();
      },
      addMission(index){
          let newMisstion = {
            missionName:'',
            missionDate:new Date(),
            editFlag:true,
            showFlag:true
          }
        this.eachList.content[0].children.push(newMisstion);
      },
      saveData(){
          for(let i=0;i<this.menuList[1].children.length;i++){
              if(this.menuList[1].children[i].childName == this.eachList.childName){
                this.menuList[1].children[i] = this.eachList;
              }
          }
        localStorage.setItem("menuList", JSON.stringify(this.menuList));
      }
    },
    mounted:function(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(localStorage.getItem("menuList")!=undefined){
        this.menuList = JSON.parse(localStorage.getItem("menuList"));
      }
      $('#alert').hide();
    },
    components: { }
}
</script>

<style scoped>
  .secondPage{
    background-color: lightgray;
    width:100%;
    height:100vh;
  }

  .mainContainer{
    width:100%;
    height:100%;
    padding:50px;
    display: flex;
  }

  .leftContainer{
    height:100%;
    flex:1;
    display: flex;
    flex-direction: column;
    background-color: rgba(255,255,255,0.7);
  }

  .title{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid grey;
  }

  .userInfoPart{
    z-index: 1;
    display: flex;
    flex-direction: row;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .userIcon{
    background: url("../images/headicon.jpg") no-repeat center;
    height:80px;
    width:80px;
    background-size:cover;
    border-radius: 50%;
  }

  .userNamePart{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:80px;
  }
  .userNameButton{
    border-radius: 5px;
    height: 20px;
    font-size: 12px;
    line-height: 10px;
  }

  .form-table{
    position:relative;
    right:60px;
    padding-top:30px;
  }

  .form-div1{
    font-size:20px;
    top:6px;
    left:20px;
    cursor:pointer;
    padding-left:55px;
  }

  .form-div2{
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .todolist-item{
    margin-bottom: 0;
    cursor: pointer
  }

  .grouplist-item{
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .addlist-item{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .rightContainer{
    flex:3;
    height:100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    background-color: rgba(255,255,255,0.7);
  }

  .rightTop{
    height:80px;
    background-color:lightslategrey;
    display: flex;
    align-items: flex-end;
  }

  .rightBottom{
    flex:1;
  }

  .event-item{
    background-color:lightslategrey;
    display: flex;
    align-items: center;
    font-size: 20px;

  }

  .disable-item{
    display: flex;
    flex-direction: row;
  }

  .addevent-item{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .rightTopTitle{
    font-size: 40px;
    font-weight:bolder;
    margin:0 0 10px 50px;
    color:white;
  }

  .startedit-item{
    margin-left: 10px;
    flex:1;display: flex;
    align-items: center;
  }

  .remove-ok-item{
    display: flex;
    align-items:center;
    width:60px;
    justify-content: center;
  }

  .item-ok{
    cursor: pointer;
    margin-left: 10px;
  }

  .item-remove{
    cursor:pointer;
    margin-left: 10px;
  }

  .eventname-item{
    margin-left: 10px;
    width:300px;
    height:30px;
  }

  .eventdata-item{
    margin:5px 0 0 10px;
    width:300px;
    height:30px;
  }
  
</style>
