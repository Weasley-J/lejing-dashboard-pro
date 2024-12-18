import {
  Department,
  Login,
  Menu,
  Order,
  PageResult,
  Point,
  Result,
  Role,
  Shipper,
  UcDashboard,
  User,
} from '@/types/apiType.ts'
import httpUtils from '@/utils/httpUtils.ts'
import { isDebugEnable, log } from '@/common/Logger.ts'
import { formatDateToLocalString } from '@/utils'

/**
 * API Request Entities Management
 */
export default {
  // 登录
  login(params: Login.Request) {
    return httpUtils.post<string>('/users/login', params, { showLoading: false, showError: false })
  },
  // 获取用户信息
  getUserInfo() {
    return httpUtils.get<User.Info>('/users/getUserInfo')
  },
  // 工作台
  dashboard: {
    // 获取报表
    getReport() {
      return httpUtils.get<UcDashboard.Report>('/order/dashboard/getReportData')
    },
    // 获取订单图表数据
    getOrderChartData() {
      return httpUtils.get<UcDashboard.OrderChartEntity>('/order/dashboard/getLineData')
    },
    // 获取城市分布数据
    getDriverCityData() {
      return httpUtils.get<UcDashboard.CityChartEntity[]>('/order/dashboard/getPieCityData')
    },
    // 获取年龄分布数据
    getDriverAgeData() {
      return httpUtils.get<UcDashboard.AgeChartEntity[]>('/order/dashboard/getPieAgeData')
    },
    // 获取雷达图数据
    getDriverRadarData() {
      return httpUtils.get<UcDashboard.RadarChartEntity>('/order/dashboard/getRadarData')
    },
  },
  // 用户管理
  user: {
    // 获取用户列表
    getUserList(params: User.RequestArgs) {
      return httpUtils.get<PageResult<User.UserItem>>('/users/list', params)
    },
    // 获取当前登录者的所有用户
    getAllUsers() {
      return httpUtils.get<User.UserItem[]>('/users//all/list', {})
    },
    // Add new user
    addUser(params: User.UserAdd) {
      return httpUtils.post<Result>('/users/create', params)
    },
    // Edit User
    editUser(params: User.UserEdit) {
      return httpUtils.post<Result>('/users/edit', params)
    },
    // Delete user
    deleteUser(userIds: number[]) {
      return httpUtils.post<Result>('/users/delete', { userIds })
    },
    //   Permission list
    getPermissions() {
      return httpUtils.get<User.PermissionItem>('/users/getPermissionList')
    },
  },

  // 部门管理
  dept: {
    // 获取部门列表
    getDepartments(params?: Department.SearchParams) {
      return httpUtils.get<Department.Item[]>('/dept/list', params)
    },
    // Add new department
    add(params: Department.CreateParams) {
      return httpUtils.post<Result>('/dept/create', params)
    },
    // Edit department
    edit(params: Department.EditParams) {
      return httpUtils.post<Result>('/dept/edit', params)
    },
    // Delete department
    delete(deptId: Department.DeleteParams) {
      return httpUtils.post<Result>('/dept/delete', deptId)
    },
  },

  // 菜单管理
  menu: {
    getMenus(params: Menu.SearchParams | undefined) {
      return httpUtils.get<Menu.Item[]>('/menu/list', params)
    },
    add(params: Menu.RequestParams) {
      return httpUtils.post<Result>('/menu/create', params)
    },
    edit(params: Menu.EditParams) {
      return httpUtils.post<Result>('/menu/edit', params)
    },
    delete(_id: string) {
      return httpUtils.post<Result>('/menu/delete', { _id })
    },
  },

  // 角色管理
  role: {
    page(params: Role.SearchArgs) {
      return httpUtils.get<PageResult<Role.RoleDetail>>('/roles/list', params)
    },
    add(params: Role.CreateParams) {
      return httpUtils.post('/roles/create', params)
    },
    edit(params: Role.EditParams) {
      return httpUtils.post('/roles/edit', params)
    },
    delete(_id: string) {
      return httpUtils.post('/roles/delete', { _id })
    },
    setPermission(params: Role.Permission) {
      return httpUtils.post('/roles/update/permission', params)
    },
    getAll() {
      return httpUtils.get<Role.RoleDetail[]>('/roles/allList')
    },
  },

  // 订单管理
  order: {
    add(params: Order.CreateParams) {
      return httpUtils.post('/order/create', params)
    },
    delete(orderIds?: string[]) {
      if (!orderIds) return
      orderIds.forEach(id => {
        httpUtils.post('/order/delete', { _id: id }).then(res => {
          if (isDebugEnable) log.info('删除订单成功: ', res)
        })
      })
    },
    update(params?: Order.OrderRoute) {
      return httpUtils.post('/order/edit', params)
    },
    getOrderDetail(orderId: string) {
      return httpUtils.get<Order.OrderDetail>(`/order/detail/${orderId}`)
    },
    getShipperList() {},
    getOrderList(params: Order.SearchArgs) {
      return httpUtils.get<PageResult<Order.OrderDetail>>('/order/list', params)
    },
    getCities() {
      return httpUtils.get<Order.CityDict[]>('/order/cityList')
    },
    getOrderVehicles() {
      return httpUtils.get<Order.VehicleDict[]>('/order/vehicleList')
    },
    exportExcel(params: any) {
      return httpUtils.download(
        '/order/orderExport',
        params,
        `订单数据_${formatDateToLocalString(new Date(), 'yyyyMMddHHmm')}.xlsx`
      )
    },
    // 订单聚合热力图数据
    getCityHeatMapPoints(cityCode: string) {
      return httpUtils.get<Point[]>(`/order/cluster/${cityCode}`)
    },
  },

  // 货运人员
  shipper: {
    getShipperList(params: Shipper.SearchParams) {
      return httpUtils.get<PageResult<Shipper.ShipperInfo>>('/order/driver/list', params)
    },
  },
}
