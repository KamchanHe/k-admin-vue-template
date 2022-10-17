import type { MockMethodType } from '@/types/mock';

const getTenantList: MockMethodType = {
  url: '/k-admin-template/portal/listTenant',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: '001',
          name: '嘉士利集团'
        },
        {
          id: '002',
          name: '嘉宝莉集团'
        }
      ]
    };
  }
};

const getDepartmentTree: MockMethodType = {
  url: '/k-admin-template/sys/dept/tree',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: '001',
          parentId: '0',
          sort: 0,
          children: [
            {
              id: 'A001',
              parentId: '001',
              sort: 0,
              children: [
                {
                  id: 'A002',
                  parentId: 'A001',
                  sort: 0,
                  children: null,
                  name: '董事会办公室',
                  code: 'A002',
                  mgrUserId: '77',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'A003',
                  parentId: 'A001',
                  sort: 0,
                  children: null,
                  name: '法务部',
                  code: 'A003',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                }
              ],
              name: '董事会',
              code: 'A001',
              mgrUserId: '41',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'A004',
              parentId: '001',
              sort: 0,
              children: null,
              name: '采购部',
              code: 'A004',
              mgrUserId: '88',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'A005',
              parentId: '001',
              sort: 0,
              children: null,
              name: '财务部',
              code: 'A005',
              mgrUserId: '92',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'A008',
              parentId: '001',
              sort: 0,
              children: null,
              name: '信息部',
              code: 'A008',
              mgrUserId: '1105',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-12 12:43:42',
              updateBy: '1105',
              mgrUserName: null
            },
            {
              id: 'A009',
              parentId: '001',
              sort: 0,
              children: null,
              name: '招生办',
              code: 'A009',
              mgrUserId: '83',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'A010',
              parentId: '001',
              sort: 0,
              children: null,
              name: '策划部',
              code: 'A010',
              mgrUserId: '410',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'B001',
              parentId: '001',
              sort: 0,
              children: [
                {
                  id: 'B002',
                  parentId: 'B001',
                  sort: 0,
                  children: [
                    {
                      id: 'X001',
                      parentId: 'B002',
                      sort: 0,
                      children: null,
                      name: '小学教师',
                      code: 'X001',
                      mgrUserId: '1912',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-14 08:46:33',
                      updateBy: '1',
                      mgrUserName: null
                    },
                    {
                      id: 'X002',
                      parentId: 'B002',
                      sort: 0,
                      children: null,
                      name: '小学生活部',
                      code: 'X002',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    },
                    {
                      id: 'X003',
                      parentId: 'B002',
                      sort: 0,
                      children: null,
                      name: '小学教务处',
                      code: 'X003',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    },
                    {
                      id: 'X004',
                      parentId: 'B002',
                      sort: 0,
                      children: null,
                      name: '小学德育处',
                      code: 'X004',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    }
                  ],
                  name: '小学部',
                  code: 'B002',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B003',
                  parentId: 'B001',
                  sort: 0,
                  children: [
                    {
                      id: 'C001',
                      parentId: 'B003',
                      sort: 0,
                      children: null,
                      name: '初中教师',
                      code: 'C001',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    },
                    {
                      id: 'C002',
                      parentId: 'B003',
                      sort: 0,
                      children: null,
                      name: '初中生活部',
                      code: 'C002',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    }
                  ],
                  name: '初中部',
                  code: 'B003',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B004',
                  parentId: 'B001',
                  sort: 0,
                  children: [
                    {
                      id: 'G001',
                      parentId: 'B004',
                      sort: 0,
                      children: null,
                      name: '高中教师',
                      code: 'G001',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    },
                    {
                      id: 'G002',
                      parentId: 'B004',
                      sort: 0,
                      children: null,
                      name: '高中生活部',
                      code: 'G002',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    },
                    {
                      id: 'G003',
                      parentId: 'B004',
                      sort: 0,
                      children: null,
                      name: '高中文印室',
                      code: 'G003',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    }
                  ],
                  name: '高中部',
                  code: 'B004',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B005',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '中学政教处',
                  code: 'B005',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B006',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '中学教务处',
                  code: 'B006',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B007',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '竞赛中心',
                  code: 'B007',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B008',
                  parentId: 'B001',
                  sort: 0,
                  children: [
                    {
                      id: 'JK001',
                      parentId: 'B008',
                      sort: 0,
                      children: null,
                      name: '监控室',
                      code: 'JK001',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    },
                    {
                      id: 'TSG001',
                      parentId: 'B008',
                      sort: 0,
                      children: null,
                      name: '图书馆',
                      code: 'TSG001',
                      mgrUserId: '0',
                      isRepair: null,
                      type: null,
                      createTime: '2022-04-08 17:32:08',
                      createBy: null,
                      updateTime: '2022-04-08 17:32:08',
                      updateBy: null,
                      mgrUserName: null
                    }
                  ],
                  name: '人力资源部',
                  code: 'B008',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B011',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '国际部',
                  code: 'B011',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'B22',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '安全处',
                  code: 'B22',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'XW001',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '校外人员、教师家属',
                  code: 'XW001',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'ZH001',
                  parentId: 'B001',
                  sort: 0,
                  children: null,
                  name: '综合服务中心',
                  code: 'ZH001',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                }
              ],
              name: '总校长室',
              code: 'B001',
              mgrUserId: '0',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'B010',
              parentId: '001',
              sort: 0,
              children: [
                {
                  id: 'T',
                  parentId: 'B010',
                  sort: 0,
                  children: null,
                  name: '特色课程组',
                  code: 'T',
                  mgrUserId: '0',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                }
              ],
              name: '对外合作部',
              code: 'B010',
              mgrUserId: '0',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            },
            {
              id: 'HQ001',
              parentId: '001',
              sort: 0,
              children: [
                {
                  id: 'HQ002',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '办公室',
                  code: 'HQ002',
                  mgrUserId: '112',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-29 16:08:04',
                  updateBy: '1',
                  mgrUserName: null
                },
                {
                  id: 'HQ003',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '校警队',
                  code: 'HQ003',
                  mgrUserId: '117',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ004',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '工程部',
                  code: 'HQ004',
                  mgrUserId: '151',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-12 12:43:11',
                  updateBy: '1105',
                  mgrUserName: null
                },
                {
                  id: 'HQ005',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '清洁部',
                  code: 'HQ005',
                  mgrUserId: '162',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ006',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '绿化部',
                  code: 'HQ006',
                  mgrUserId: '193',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ007',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '医务室',
                  code: 'HQ007',
                  mgrUserId: '203',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ008',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '校车队',
                  code: 'HQ008',
                  mgrUserId: '213',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ009',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '小学饭堂',
                  code: 'HQ009',
                  mgrUserId: '219',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ010',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '中学饭堂',
                  code: 'HQ010',
                  mgrUserId: '219',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                },
                {
                  id: 'HQ011',
                  parentId: 'HQ001',
                  sort: 0,
                  children: null,
                  name: '第三饭堂',
                  code: 'HQ011',
                  mgrUserId: '219',
                  isRepair: null,
                  type: null,
                  createTime: '2022-04-08 17:32:08',
                  createBy: null,
                  updateTime: '2022-04-08 17:32:08',
                  updateBy: null,
                  mgrUserName: null
                }
              ],
              name: '后勤服务部',
              code: 'HQ001',
              mgrUserId: '107',
              isRepair: null,
              type: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-08 17:32:08',
              updateBy: null,
              mgrUserName: null
            }
          ],
          name: '江门广雅',
          code: '001',
          mgrUserId: '5',
          isRepair: null,
          type: null,
          createTime: '2022-04-08 17:32:08',
          createBy: null,
          updateTime: '2022-04-08 17:32:08',
          updateBy: null,
          mgrUserName: null
        }
      ]
    };
  }
};

const getPersonnelList: MockMethodType = {
  url: '/k-admin-template/sys/user/list',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: '1',
          mobile: '130****0000',
          account: '130****0000',
          name: '管理员1',
          code: 'admin',
          password: null,
          icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          deptId: 'X001',
          positionId: null,
          superFlag: 1,
          loginEnable: 1,
          servingState: 1,
          salesFlag: 0,
          identityNo: '440783197003091011',
          remark: '测试备注',
          appClient: 'android',
          appToken: 'test',
          createTime: '2022-03-02 09:00:16',
          createBy: null,
          updateTime: '2022-09-23 02:43:05',
          updateBy: '1',
          multiDeptIds: null,
          roleIds: null,
          loadChildDept: null,
          deptInfo: null,
          roleList: null,
          authorList: null,
          authorIds: null,
          selectIds: null,
          tenantInfo: null,
          wxUserInfoList: [
            {
              id: '1',
              appId: 'wx672fd15f28458033',
              sysUserId: '1',
              appType: null,
              subscribe: 1,
              subscribeScene: null,
              subscribeTime: null,
              subscribeNum: null,
              cancelSubscribeTime: null,
              openId: '0',
              nickName: '员工001',
              empName: '员工001',
              sex: null,
              city: null,
              country: null,
              province: null,
              phone: '13000000000',
              language: null,
              headimgUrl: null,
              unionId: null,
              groupId: null,
              tagidList: null,
              qrSceneStr: null,
              latitude: null,
              longitude: null,
              precisionVal: null,
              sessionKey: null,
              createTime: '2022-09-20 02:32:35',
              createBy: null,
              updateTime: '2022-09-23 02:43:08',
              updateBy: '1',
              notBindFlag: null
            }
          ]
        },
        {
          id: '10',
          mobile: 'test',
          account: 'test',
          name: '管理员2',
          code: '123',
          password: null,
          icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          deptId: 'X001',
          positionId: null,
          superFlag: 1,
          loginEnable: 1,
          servingState: 0,
          salesFlag: 0,
          identityNo: '460783197003091011',
          remark: '测试备注',
          appClient: 'android',
          appToken: 'Aic9jM5SAvoUyvHB5rKozDriB-sjQBBDPvq_Z1H5Krm6',
          createTime: '2022-03-02 09:00:16',
          createBy: null,
          updateTime: '2022-09-23 02:45:24',
          updateBy: '1',
          multiDeptIds: null,
          roleIds: null,
          loadChildDept: null,
          deptInfo: null,
          roleList: null,
          authorList: null,
          authorIds: null,
          selectIds: null,
          tenantInfo: null,
          wxUserInfoList: [
            {
              id: 'e586d16e503bb6aa18ca174e9ad9d525',
              appId: 'wx9dde454c02ea5f14',
              sysUserId: '10',
              appType: 2,
              subscribe: 1,
              subscribeScene: 'ADD_SCENE_PROFILE_CARD',
              subscribeTime: null,
              subscribeNum: null,
              cancelSubscribeTime: null,
              openId: 'o1t596Shqwd5Zd2fq-ta-UU6rNjs',
              nickName: '阿白',
              empName: '管理员2',
              sex: null,
              city: null,
              country: null,
              province: null,
              phone: '13000000001',
              language: null,
              headimgUrl:
                'https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM40cZyW6tDiaftWARJzibCdE36nMteJtRSx7IpZ0CVMH4owiakIiaFicgHticgV6EeGtPvEIrIKXYHXVIibA/132',
              unionId: null,
              groupId: null,
              tagidList: '[]',
              qrSceneStr: null,
              latitude: null,
              longitude: null,
              precisionVal: null,
              sessionKey: null,
              createTime: '2022-09-21 15:19:30',
              createBy: null,
              updateTime: '2022-09-23 02:40:56',
              updateBy: 'e586d16e503bb6aa18ca174e9ad9d525',
              notBindFlag: null
            }
          ]
        },
        {
          id: '11',
          mobile: '189****2255',
          account: '189****2255',
          name: '谭权锐',
          code: 'tqr',
          password: null,
          icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          deptId: '000',
          positionId: null,
          superFlag: 1,
          loginEnable: 1,
          servingState: 0,
          salesFlag: 0,
          identityNo: '23112',
          remark: '测试备注',
          appClient: '#',
          appToken: '#',
          createTime: '2022-03-02 09:00:16',
          createBy: null,
          updateTime: '2022-09-21 07:43:19',
          updateBy: '1',
          multiDeptIds: null,
          roleIds: null,
          loadChildDept: null,
          deptInfo: null,
          roleList: null,
          authorList: null,
          authorIds: null,
          selectIds: null,
          tenantInfo: null,
          wxUserInfoList: []
        },
        {
          id: '2',
          mobile: 'test2',
          account: 'test2',
          name: '开发DEV',
          code: 'dev',
          password: null,
          icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          deptId: '000',
          positionId: null,
          superFlag: 1,
          loginEnable: 1,
          servingState: 0,
          salesFlag: 0,
          identityNo: '44078319700309121x',
          remark: '测试备注',
          appClient: '#',
          appToken: '#',
          createTime: '2022-03-02 09:00:16',
          createBy: null,
          updateTime: '2022-09-23 02:45:29',
          updateBy: '1',
          multiDeptIds: null,
          roleIds: null,
          loadChildDept: null,
          deptInfo: null,
          roleList: null,
          authorList: null,
          authorIds: null,
          selectIds: null,
          tenantInfo: null,
          wxUserInfoList: []
        },
        {
          id: '23',
          mobile: '132****0016',
          account: '132****0016',
          name: '柒胜Hex',
          code: 'hex',
          password: null,
          icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          deptId: '000',
          positionId: null,
          superFlag: 1,
          loginEnable: 1,
          servingState: 0,
          salesFlag: 0,
          identityNo: '2311',
          remark: '测试备注',
          appClient: '#',
          appToken: '#',
          createTime: '2022-03-02 09:00:16',
          createBy: null,
          updateTime: '2022-09-23 02:45:39',
          updateBy: '1',
          multiDeptIds: null,
          roleIds: null,
          loadChildDept: null,
          deptInfo: null,
          roleList: null,
          authorList: null,
          authorIds: null,
          selectIds: null,
          tenantInfo: null,
          wxUserInfoList: [
            {
              id: '0367039a666abb4315629cbdbf915da5',
              appId: 'wx9dde454c02ea5f14',
              sysUserId: '23',
              appType: 2,
              subscribe: 1,
              subscribeScene: 'ADD_SCENE_PROFILE_CARD',
              subscribeTime: null,
              subscribeNum: null,
              cancelSubscribeTime: null,
              openId: 'o1t596YFl97BcLKbi2cubhag3-gg',
              nickName: 'Hex',
              empName: '柒胜Hex',
              sex: null,
              city: null,
              country: null,
              province: null,
              phone: '13286630016',
              language: null,
              headimgUrl:
                'https://thirdwx.qlogo.cn/mmopen/vi_32/3nFTIe1BF3zFdKeECv8bg591ZkEytAH8bOIspMEFNm6GL3Icc60caFeoO07t2GKtt11Ted0UrtDhiboicx2GFILw/132',
              unionId: null,
              groupId: null,
              tagidList: '[]',
              qrSceneStr: null,
              latitude: null,
              longitude: null,
              precisionVal: null,
              sessionKey: null,
              createTime: '2022-09-22 14:24:46',
              createBy: null,
              updateTime: '2022-09-23 02:40:42',
              updateBy: '0367039a666abb4315629cbdbf915da5',
              notBindFlag: null
            }
          ]
        },
        {
          id: '3',
          mobile: '159****2884',
          account: '159****2884',
          name: '柒胜',
          code: 'qs07',
          password: null,
          icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          deptId: '000',
          positionId: null,
          superFlag: 1,
          loginEnable: 1,
          servingState: 0,
          salesFlag: 0,
          identityNo: '23',
          remark: '测试备注',
          appClient: '#',
          appToken: '#',
          createTime: '2022-03-02 09:00:16',
          createBy: null,
          updateTime: '2022-09-21 07:43:19',
          updateBy: '1',
          multiDeptIds: null,
          roleIds: null,
          loadChildDept: null,
          deptInfo: null,
          roleList: null,
          authorList: null,
          authorIds: null,
          selectIds: null,
          tenantInfo: null,
          wxUserInfoList: [
            {
              id: '4b11ab9522ce783ec01a8a4e5cba9dc3',
              appId: 'wx9dde454c02ea5f14',
              sysUserId: '3',
              appType: 2,
              subscribe: 1,
              subscribeScene: 'ADD_SCENE_SEARCH',
              subscribeTime: null,
              subscribeNum: null,
              cancelSubscribeTime: null,
              openId: 'o1t596WU_X4rGqcgdTNHDmboynjU',
              nickName: '07',
              empName: '柒胜',
              sex: null,
              city: null,
              country: null,
              province: null,
              phone: '15989082884',
              language: null,
              headimgUrl:
                'https://thirdwx.qlogo.cn/mmopen/vi_32/4aV1iaEx78HBDzS0KDmGwoaoMeOlpoEqWKI3YXDFKsuljxWlW5yz3EYrb9HFoQBiavg6tx21vWrTAqDN21BRIreg/132',
              unionId: null,
              groupId: null,
              tagidList: '[]',
              qrSceneStr: null,
              latitude: null,
              longitude: null,
              precisionVal: null,
              sessionKey: null,
              createTime: '2022-09-23 21:06:31',
              createBy: null,
              updateTime: '2022-09-23 13:06:31',
              updateBy: '4b11ab9522ce783ec01a8a4e5cba9dc3',
              notBindFlag: null
            }
          ]
        }
      ]
    };
  }
};

const getPersonnelPage: MockMethodType = {
  url: '/k-admin-template/sys/user/page',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: {
        pageSize: 10,
        pageNum: 1,
        total: 6,
        totalPage: 1,
        list: [
          {
            id: '1',
            mobile: '130****0000',
            account: '130****0000',
            name: '管理员1',
            code: 'admin',
            password: null,
            icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
            deptId: 'X001',
            positionId: null,
            superFlag: 1,
            loginEnable: 1,
            servingState: 1,
            salesFlag: 0,
            identityNo: '440783197003091011',
            remark: '测试备注',
            appClient: 'android',
            appToken: 'test',
            createTime: '2022-03-02 09:00:16',
            createBy: null,
            updateTime: '2022-09-23 02:43:05',
            updateBy: '1',
            multiDeptIds: null,
            roleIds: null,
            loadChildDept: null,
            deptInfo: {
              id: 'X001',
              name: '小学教师',
              code: 'X001',
              parentId: 'B002',
              mgrUserId: '1912',
              levelPath: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-14 08:46:33',
              updateBy: '1',
              mgrUserName: null
            },
            roleList: [
              {
                id: 'd22481eb2a295c65dccbaecfcf051c0a',
                name: '测试角色',
                enable: 1,
                isDefault: 0,
                userVisible: 1,
                createTime: '2022-05-17 15:54:32',
                updateTime: '2022-09-15 16:26:31',
                createBy: '1',
                updateBy: '1',
                menuList: null
              }
            ],
            authorList: null,
            authorIds: null,
            selectIds: null,
            tenantInfo: null,
            wxUserInfoList: null
          },
          {
            id: '10',
            mobile: 'test',
            account: 'test',
            name: '管理员2',
            code: '123',
            password: null,
            icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
            deptId: 'X001',
            positionId: null,
            superFlag: 1,
            loginEnable: 1,
            servingState: 0,
            salesFlag: 0,
            identityNo: '460783197003091011',
            remark: '测试备注',
            appClient: 'android',
            appToken: 'Aic9jM5SAvoUyvHB5rKozDriB-sjQBBDPvq_Z1H5Krm6',
            createTime: '2022-03-02 09:00:16',
            createBy: null,
            updateTime: '2022-09-23 02:45:24',
            updateBy: '1',
            multiDeptIds: null,
            roleIds: null,
            loadChildDept: null,
            deptInfo: {
              id: 'X001',
              name: '小学教师',
              code: 'X001',
              parentId: 'B002',
              mgrUserId: '1912',
              levelPath: null,
              createTime: '2022-04-08 17:32:08',
              createBy: null,
              updateTime: '2022-04-14 08:46:33',
              updateBy: '1',
              mgrUserName: null
            },
            roleList: [],
            authorList: null,
            authorIds: null,
            selectIds: null,
            tenantInfo: null,
            wxUserInfoList: null
          },
          {
            id: '11',
            mobile: '189****2255',
            account: '189****2255',
            name: '谭权锐',
            code: 'tqr',
            password: null,
            icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
            deptId: '000',
            positionId: null,
            superFlag: 1,
            loginEnable: 1,
            servingState: 0,
            salesFlag: 0,
            identityNo: '23112',
            remark: '测试备注',
            appClient: '#',
            appToken: '#',
            createTime: '2022-03-02 09:00:16',
            createBy: null,
            updateTime: '2022-09-21 07:43:19',
            updateBy: '1',
            multiDeptIds: null,
            roleIds: null,
            loadChildDept: null,
            deptInfo: null,
            roleList: [],
            authorList: null,
            authorIds: null,
            selectIds: null,
            tenantInfo: null,
            wxUserInfoList: null
          },
          {
            id: '2',
            mobile: 'test2',
            account: 'test2',
            name: '开发DEV',
            code: 'dev',
            password: null,
            icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
            deptId: '000',
            positionId: null,
            superFlag: 1,
            loginEnable: 1,
            servingState: 0,
            salesFlag: 0,
            identityNo: '44078319700309121x',
            remark: '测试备注',
            appClient: '#',
            appToken: '#',
            createTime: '2022-03-02 09:00:16',
            createBy: null,
            updateTime: '2022-09-23 02:45:29',
            updateBy: '1',
            multiDeptIds: null,
            roleIds: null,
            loadChildDept: null,
            deptInfo: null,
            roleList: [],
            authorList: null,
            authorIds: null,
            selectIds: null,
            tenantInfo: null,
            wxUserInfoList: null
          },
          {
            id: '23',
            mobile: '132****0016',
            account: '132****0016',
            name: '柒胜Hex',
            code: 'hex',
            password: null,
            icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
            deptId: '000',
            positionId: null,
            superFlag: 1,
            loginEnable: 1,
            servingState: 0,
            salesFlag: 0,
            identityNo: '2311',
            remark: '测试备注',
            appClient: '#',
            appToken: '#',
            createTime: '2022-03-02 09:00:16',
            createBy: null,
            updateTime: '2022-09-23 02:45:39',
            updateBy: '1',
            multiDeptIds: null,
            roleIds: null,
            loadChildDept: null,
            deptInfo: null,
            roleList: [],
            authorList: null,
            authorIds: null,
            selectIds: null,
            tenantInfo: null,
            wxUserInfoList: null
          },
          {
            id: '3',
            mobile: '159****2884',
            account: '159****2884',
            name: '柒胜',
            code: 'qs07',
            password: null,
            icon: 'https://img2.baidu.com/it/u=2945453006,1814818261&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
            deptId: '000',
            positionId: null,
            superFlag: 1,
            loginEnable: 1,
            servingState: 0,
            salesFlag: 0,
            identityNo: '23',
            remark: '测试备注',
            appClient: '#',
            appToken: '#',
            createTime: '2022-03-02 09:00:16',
            createBy: null,
            updateTime: '2022-09-21 07:43:19',
            updateBy: '1',
            multiDeptIds: null,
            roleIds: null,
            loadChildDept: null,
            deptInfo: null,
            roleList: [],
            authorList: null,
            authorIds: null,
            selectIds: null,
            tenantInfo: null,
            wxUserInfoList: null
          }
        ]
      }
    };
  }
};

const getRoleList: MockMethodType = {
  url: '/k-admin-template/sys/role/list',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: '1',
          name: '系统默认',
          enable: 1,
          isDefault: 1,
          userVisible: 0,
          createTime: '2022-03-11 18:13:34',
          updateTime: '2022-03-29 10:57:08',
          createBy: null,
          updateBy: '1',
          menuList: null
        },
        {
          id: '83982e00fbd677a1ac6b0a884953fe9b',
          name: '测试',
          enable: 1,
          isDefault: 0,
          userVisible: 0,
          createTime: '2022-10-17 10:21:35',
          updateTime: '2022-10-17 02:21:35',
          createBy: '1',
          updateBy: null,
          menuList: null
        },
        {
          id: 'd22481eb2a295c65dccbaecfcf051c0a',
          name: '测试角色',
          enable: 1,
          isDefault: 0,
          userVisible: 1,
          createTime: '2022-05-17 15:54:32',
          updateTime: '2022-10-17 10:20:46',
          createBy: '1',
          updateBy: '1',
          menuList: null
        }
      ]
    };
  }
};

const getRoleDetail: MockMethodType = {
  url: '/k-admin-template/sys/role/:id',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: {
        id: '1',
        name: '系统默认',
        enable: 1,
        isDefault: 1,
        userVisible: 0,
        createTime: '2022-03-11 18:13:34',
        updateTime: '2022-03-29 10:57:08',
        createBy: null,
        updateBy: '1',
        menuList: [
          {
            id: '170100',
            name: '查看班级管理页',
            sort: 0,
            pid: '170000',
            type: 0,
            hideFlag: 0,
            clientType: 0,
            permitIds: null
          },
          {
            id: '170200',
            name: '新建班级',
            sort: 0,
            pid: '170000',
            type: 1,
            hideFlag: 0,
            clientType: 0,
            permitIds: null
          },
          {
            id: '170300',
            name: '编辑班级',
            sort: 0,
            pid: '170000',
            type: 1,
            hideFlag: 0,
            clientType: 0,
            permitIds: null
          },
          {
            id: '170400',
            name: '删除班级',
            sort: 0,
            pid: '170000',
            type: 1,
            hideFlag: 0,
            clientType: 0,
            permitIds: null
          }
        ]
      }
    };
  }
};

const createRole: MockMethodType = {
  url: '/k-admin-template/sys/role/save',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: null,
      message: '操作成功'
    };
  }
};

const updateRole: MockMethodType = {
  url: '/k-admin-template/sys/role/updateById',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: null,
      message: '操作成功'
    };
  }
};

const deleteRole: MockMethodType = {
  url: '/k-admin-template/sys/role/deleteById/:id',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: null,
      message: '操作成功'
    };
  }
};

const saveRolePersonnel: MockMethodType = {
  url: '/k-admin-template/sys/role/saveUserRole',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: null,
      message: '操作成功'
    };
  }
};

const removeRolePersonnel: MockMethodType = {
  url: '/k-admin-template/sys/role/removeUserRole',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: null,
      message: '操作成功'
    };
  }
};

const getMenuTree: MockMethodType = {
  url: '/k-admin-template/sys/menu/tree',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: '160000',
          parentId: '0',
          sort: 1,
          children: [
            {
              id: '160100',
              parentId: '160000',
              sort: 0,
              children: null,
              name: '查看年级管理页',
              pid: '160000',
              type: 0
            },
            {
              id: '160200',
              parentId: '160000',
              sort: 0,
              children: null,
              name: '新建年级',
              pid: '160000',
              type: 1
            },
            {
              id: '160300',
              parentId: '160000',
              sort: 0,
              children: null,
              name: '编辑年级',
              pid: '160000',
              type: 1
            },
            {
              id: '160400',
              parentId: '160000',
              sort: 0,
              children: null,
              name: '删除年级',
              pid: '160000',
              type: 1
            },
            {
              id: '160500',
              parentId: '160000',
              sort: 0,
              children: null,
              name: '毕业年级',
              pid: '160000',
              type: 1
            },
            {
              id: '160600',
              parentId: '160000',
              sort: 0,
              children: null,
              name: '年级升迁',
              pid: '160000',
              type: 1
            }
          ],
          name: '年级管理',
          pid: '0',
          type: 0
        },
        {
          id: '170000',
          parentId: '0',
          sort: 2,
          children: [
            {
              id: '170100',
              parentId: '170000',
              sort: 0,
              children: null,
              name: '查看班级管理页',
              pid: '170000',
              type: 0
            },
            {
              id: '170200',
              parentId: '170000',
              sort: 0,
              children: null,
              name: '新建班级',
              pid: '170000',
              type: 1
            },
            {
              id: '170300',
              parentId: '170000',
              sort: 0,
              children: null,
              name: '编辑班级',
              pid: '170000',
              type: 1
            },
            {
              id: '170400',
              parentId: '170000',
              sort: 0,
              children: null,
              name: '删除班级',
              pid: '170000',
              type: 1
            }
          ],
          name: '班级管理',
          pid: '0',
          type: 0
        },
        {
          id: '180000',
          parentId: '0',
          sort: 3,
          children: [
            {
              id: '180100',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '查看学生花名册页',
              pid: '180000',
              type: 0
            },
            {
              id: '180200',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '下载Excel模版',
              pid: '180000',
              type: 1
            },
            {
              id: '180300',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '导入Excel',
              pid: '180000',
              type: 1
            },
            {
              id: '180400',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '全部导出Excel',
              pid: '180000',
              type: 1
            },
            {
              id: '180500',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '新建学生',
              pid: '180000',
              type: 1
            },
            {
              id: '180600',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '查看详情页',
              pid: '180000',
              type: 1
            },
            {
              id: '180700',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '删除学生',
              pid: '180000',
              type: 1
            },
            {
              id: '180800',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '修改学生资料',
              pid: '180000',
              type: 1
            },
            {
              id: '180900',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '办理学生调班',
              pid: '180000',
              type: 1
            },
            {
              id: '181000',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '办理学生毕业',
              pid: '180000',
              type: 1
            },
            {
              id: '181100',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '办理学生休学',
              pid: '180000',
              type: 1
            },
            {
              id: '181200',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '办理学生复学',
              pid: '180000',
              type: 1
            },
            {
              id: '181300',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '办理学生转学',
              pid: '180000',
              type: 1
            },
            {
              id: '181400',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '办理学生肄业',
              pid: '180000',
              type: 1
            },
            {
              id: '181500',
              parentId: '180000',
              sort: 0,
              children: null,
              name: '选择导出Excel',
              pid: '180000',
              type: 1
            }
          ],
          name: '学生花名册',
          pid: '0',
          type: 0
        },
        {
          id: '590000',
          parentId: '0',
          sort: 3,
          children: [
            {
              id: '590100',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看学生资助页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590200',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看学生处分页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590300',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看学生奖励页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590400',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看德育项目管理页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590500',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看学生德育页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590600',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看学生考勤页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590700',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '查看学生健康页面',
              pid: '590000',
              type: 0
            },
            {
              id: '590800',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '操作学生资助',
              pid: '590000',
              type: 1
            },
            {
              id: '590900',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '操作学生处分',
              pid: '590000',
              type: 1
            },
            {
              id: '591000',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '操作学生奖励',
              pid: '590000',
              type: 1
            },
            {
              id: '591100',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '操作学生德育',
              pid: '590000',
              type: 1
            },
            {
              id: '591200',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '操作学生考勤',
              pid: '590000',
              type: 1
            },
            {
              id: '591300',
              parentId: '590000',
              sort: 0,
              children: null,
              name: '操作学生健康',
              pid: '590000',
              type: 1
            }
          ],
          name: '学生管理相关',
          pid: '0',
          type: 0
        },
        {
          id: '640000',
          parentId: '0',
          sort: 3,
          children: [
            {
              id: '640100',
              parentId: '640000',
              sort: 0,
              children: null,
              name: '查看学生分班管理页',
              pid: '640000',
              type: 0
            }
          ],
          name: '学生分班管理',
          pid: '0',
          type: 0
        }
      ],
      message: '操作成功'
    };
  }
};

const saveRoleMenu: MockMethodType = {
  url: '/k-admin-template/sys/role/saveRoleMenu',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: null,
      message: '操作成功'
    };
  }
};

export default [
  getTenantList,
  getDepartmentTree,
  getPersonnelList,
  getPersonnelPage,
  getRoleList,
  getRoleDetail,
  createRole,
  updateRole,
  deleteRole,
  saveRolePersonnel,
  removeRolePersonnel,
  getMenuTree,
  saveRoleMenu
];
