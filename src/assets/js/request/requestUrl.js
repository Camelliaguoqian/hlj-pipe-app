/**
 * url of request
 * 返回值格式：{
 * "retCode": "SUCCESS|FAIL",
 * "retMsg": "查询成功！|......",
 * "retData": {...} | [...]
 * }
 */
 
let url = {
  //==========================字典值查询================================================
  /**
   * 字典值查询
   * 任务状态
   * 参数：String dicCode
   * 备注：
   * 1）告警级别 'POW_DEF_ALARM.ALARM_LEVEL'
   * 2）管线类型 'GL_PIPELINE.ENTITY_TYPE_ID' 
   * 3）管廊 'GL_PIPE_GALLERY.ENTITY_TYPE_ID'
   * 4）分区 'GL_ZONE.ENTITY_TYPE_ID'
   * 5）舱室类别 'GL_CABIN.SMALL_TYPE'
   * 6）舱室类型 'GL_CABIN.ENTITY_TYPE_ID'
   * 7）工单状态 'GL_WORK_ORDER.STATUS'
   * 8）系统名称 'IOT_DEVICE.SYSTEMID'
   * 9）设备类型 'IOT_DEVICE.DEVTYPEID'
   */
  getDicListByCode: '/dic/getDicListByCode',

  /**
   * 字典值查询
   * 查询管廊接口
   * 参数：无
   */
  getPipe: '/dic/getPipe',

  /**
   * 字典值查询
   * 根据管廊ID查询分区接口
   * 参数：String pipeId
   */
  getZoneByPipe: '/dic/getZoneByPipe',

  /**
   * 字典值查询
   * 根据管廊ID、分区ID查询舱室接口
   * 参数：String pipeId,String zoneId
   */
  getCabinByPipeZone: '/dic/getCabinByPipeZone',

  //==========================页面功能=================================================

  /**
   * 登录
   * 参数：String userCode,String userPwd （md5加密）
   */
  userLogin: '/user/login',

  /**
   * 退出登录
   * 参数：无
   */
  userLoginOut: '/user/logout',

  /**
   * 查询用户信息接口
   * 参数：无
   */
  getUser: '/user/getUser',

  /**
   * 工作任务
   * 参数：无
   */
  workTaskList: '/homePage/workTask',

  /**
   * 任务查询
   * 参数：String pipeId,String startTime,String endTime,String status,String code
   */
  taskSearch: '/homePage/taskSearch',

  /**
   * 报警查询
   * 参数：String pipeId,String zoneId,String cabinId,String systemId,String alarmLevel,String startTime,String endTime
   */
  alarmSearch: '/homePage/alarmSearch',

  /**
   * 管线查询
   * 参数：String entityTypeId
   */
  pipeLineSearch: '/homePage/pipeLineSearch',

  /**
   * 设备查询
   * 参数：String devTypeId, String systemId, String pipeId, String zoneId, String cabinId
   */
  deviceSearch: '/homePage/deviceSearch',

  /**
   * 消息查询
   * 参数：String isRead
   * 备注：查询所有消息时，isRead='';查询未读消息时，isRead='0'
   */
  noticeSearch: '/homePage/noticeSearch',

}
 
export default {
  url
}
