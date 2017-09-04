import urlParams from 'assets/urlParams'
export default {
  keyword: '自定义页面',
  filename: 'CustomPage',
  APIS: {
    getList: 'micropage/queryPage.json',
    delete: 'micropage/removePage.json',
    toMain: 'micropage/updateToMainPage.json',
    copy: 'micropage/updateCopyPage.json',
    upgrad: 'micropage/updateToUpPage.json'
  },
  PageSizes: [2, 5, 10, 20, 50, 100],  // 可以不改
  pagination: {  // 可以不改
    count: 0,
    currentPage: 1,
    pageSize: 10
  },
  table: {  // 不需要修改
    data: [],
    loading: false
  },
  searchForm: {
    form: {
      nameFuzzy: '',
      businessNo: urlParams.businessNo,
      pageType: 'WMALL_CUSTOM',
      isMain: '',
      isDraft: '',
      orderByType: ''
    }
  }
}
