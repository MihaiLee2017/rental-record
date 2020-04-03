export const TABLE_MAXINS = {
  data() {
    return {
      tableLoading: false, // 是否加载数据
      params: {}, // 查询条件
      // 分页配置
      pageObj: {
        page: 1,
        pagesize: 10
      },
      pageSizeList: [10, 20, 30, 40, 50],
      // 总条数
      total: 0
      // tableSelectList: []
    };
  },
  computed: {},
  mounted() {
    this._getData();
  },
  methods: {
    // 过滤查询方法
    _filterHandle() {
      this.pageObj.page = 1;
      this._pageCurrentChange(1);
    },
    // 获取数据方法 判断是否真正获取数据=》设置参数=》执行请求
    _getData() {
      if (this.tableLoading) {
        return false;
      }
      this.tableLoading = true;
      this._setParamsAndAction();
    },
    // 分页栏 handle 方法
    _pageSizeChange(val) {
      this.pageObj.page = 1;
      this.pageObj.pagesize = val;
      this.params = {
        ...this.params,
        ...this.pageObj
      };
      this._getData();
    },
    _pageCurrentChange(val) {
      this.pageObj.page = val;
      this.params = {
        ...this.params,
        ...this.pageObj
      };
      this._getData();
    }
  }
};
