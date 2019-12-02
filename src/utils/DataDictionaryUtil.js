//common方法-自定义数据字典值
let DataDictionaryUtil = {}

DataDictionaryUtil = {
  //字典值-任务状态
  commonJudgeStatusType(val) {
    let retData = {status: '',classNameType: ''};
    switch(val) {
      case '150':
        retData.status = '未处理';
        retData.classNameType = 'danger';
        break;
      case '151':
        retData.status = '处理中';
        retData.classNameType = 'warning';
        break;
      case '152':
        retData.status = '已完成';
        retData.classNameType = 'success';
        break;
    }
    return retData;
  },

  //反查任务状态的id
  commonJudgeStatusTypeId(val) {
    let typeId = '';
    switch(val) {
      case '未处理':
        typeId = '150';
        break;
      case '处理中':
        typeId = '151';
        break;
      case '已完成':
        typeId = '152';
        break;
    }
    return typeId;
  },

  //字典值-报警级别
  commonJudgeAlarmType(val) {
    let retData = {status: '',classNameType: ''};
    switch(val) {
      case '1':
        retData.status = '一级';
        retData.classNameType = 'danger';
        break;
      case '2':
        retData.status = '二级';
        retData.classNameType = 'warning';
        break;
      case '3':
        retData.status = '三级';
        retData.classNameType = 'primary';
        break;
      case '4':
        retData.status = '四级';
        retData.classNameType = 'success';
        break;
    }
    return retData;
  },

  //根据报警级别名称反查id
  commonJudgeAlarmLevelId(val) {
    let retData = '';
    switch(val) {
      case '一级':
        retData = '107001';
        break;
      case '二级':
        retData = '107002';
        break;
      case '三级':
        retData = '107003';
        break;
      case '四级':
        retData = '107004';
        break;
    }
    return retData;
  },

  //根据管线类别名称反查id
  commonJudgePineLineTypeId(val) {
    let retData = '';
    switch(val) {
      case '供水管线':
        retData = '106102';
        break;
      case '燃气管线':
        retData = '106103';
        break;
      case '污水管线':
        retData = '106104';
        break;
      case '电力线缆':
        retData = '106105';
        break;
      case '热力管线':
        retData = '106106';
        break;
      case '通信线缆':
        retData = '106107';
        break;
    }
    return retData;
  },

  //根据系统名称反查id
  commonJudgeSystemId(val) {
    let retData = '';
    switch(val) {
      case '照明系统':
        retData = '100213';
        break;
      case '供电系统':
        retData = '100214';
        break;
      case '通风系统':
        retData = '100215';
        break;
      case '消防系统':
        retData = '100216';
        break;
      case '监控与报警系统':
        retData = '300328';
        break;
      case '排水系统':
        retData = '300329';
        break;
      case '标示系统':
        retData = '300330';
        break;
    }
    return retData;
  },


}


  export default DataDictionaryUtil


