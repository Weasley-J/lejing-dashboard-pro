import { Button, Form, Input, Space, Table, TableColumnsType } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { Action, ModalProps } from '@/types/modal.ts'
import api from '@/api'
import { Department, User } from '@/types/apiTypes.ts'
import MenuModal from '@/views/system/dept/DeptModal.tsx'
import { debugEnable, log } from '@/common/loggerProvider.ts'
import { formatDateToLocalString } from '@/utils'
import { message, modal } from '@/context/AntdGlobalProvider.ts'

/**
 * 部门列表
 * @constructor
 */
export default function DepartmentFC() {
  const [form] = useForm()
  const [departments, setDepartments] = useState<Department.Item[]>([])
  const [loading, setLoading] = useState(false)
  const currentRef = useRef<ModalProps>({
    openModal: (action: Action, data?: User.UserItem | { parentId: string }) => {
      if (debugEnable) log.info('开启弹窗显示: ', action, data)
    },
    closeModal: () => {},
  })

  useEffect(() => {
    getDepartments().then(() => setLoading(false))
  }, [])

  async function getDepartments() {
    const data = await api.dept.getDepartments(form.getFieldsValue())
    setDepartments(data)
  }

  function onDeptDelete(_id?: string) {
    log.info('删除部门')
    modal.confirm({
      title: '确认删除用户',
      content: '确认要删除所选用户吗？',
      onOk: async () => {
        if (!_id) return
        await api.dept.delete({ _id })
        message.success('删除成功')
        getDepartments()
      },
    })
  }

  function onDeptEdit(record?: Department.Item) {
    currentRef?.current?.openModal('edit', record) // 打开弹窗
  }

  /**
   * 新增部门
   */
  function onMainCreate() {
    currentRef?.current?.openModal('create') // 打开弹窗
  }

  const onSubCreate = (parentId?: string) => {
    currentRef?.current?.openModal('create', { parentId }) // 打开弹窗
  }

  function onSearch() {
    setLoading(!loading)
    getDepartments().then(() => setLoading(false))
  }

  const columns: TableColumnsType<Department.Item> = [
    { title: '部门名称', key: 'deptName', dataIndex: 'deptName', width: 200 },
    { title: '负责人', key: 'userName', dataIndex: 'userName', width: 100 },
    { title: '更新时间', key: 'updateTime', dataIndex: 'updateTime', render: _text => formatDateToLocalString(_text) },
    { title: '创建时间', key: 'createTime', dataIndex: 'createTime', render: _text => formatDateToLocalString(_text) },
    {
      title: '操作',
      key: 'action',
      width: 220,
      render: (_text, record?: Department.Item) => {
        return (
          <Space>
            <Button color={'primary'} variant={'dashed'} onClick={() => onSubCreate(record?._id)}>
              新增
            </Button>
            <Button color={'primary'} variant={'dashed'} onClick={() => onDeptEdit(record)}>
              编辑
            </Button>
            <Button type={'dashed'} danger={true} onClick={() => onDeptDelete(record?._id)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <div className={'user-list'}>
      <Form className={'search-box'} layout={'inline'} form={form}>
        <Form.Item name={'deptName'} label={'部门名称'}>
          <Input placeholder={'请输入部门名称'} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type={'primary'} onClick={onSearch}>
              搜索
            </Button>
            <Button
              type={'default'}
              onClick={() => {
                form.resetFields()
                getDepartments()
              }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">部门列表</div>
          <div className="action">
            <Button type={'primary'} onClick={onMainCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey={'_id'}
          columns={columns}
          dataSource={departments}
          pagination={false}
          loading={loading}
        />
      </div>
      <MenuModal currentRef={currentRef} onRefreshed={getDepartments} />
    </div>
  )
}
