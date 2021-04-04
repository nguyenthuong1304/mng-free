<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="
        peoples.data.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Tên" prop="name" />
      <el-table-column label="Công việc" prop="job" />
      <el-table-column label="Ngày sinh" prop="birthday" />
      <el-table-column label="Quê quán" prop="hometown" />
      <el-table-column label="Chiều cao (cm)" prop="height" />
      <el-table-column label="Cân nặng (kg)" prop="weight" />
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button
            v-for="action in actions"
            :key="action"
            size="mini"
            :type="typeActions[action].type"
            @click="typeActions[action].handle(scope.$index, scope.row)"
          >{{ typeActions[action].text }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-1 center">
      <el-pagination
        background
        layout="sizes, prev, pager, next"
        :page-size="peoples.meta.perPage"
        :total="peoples.meta.total"
        :current-page.sync="peoples.meta.currentPage"
        :page-sizes="[25, 50, 100]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TableBasic',
  props: {
    actions: {
      type: Array,
      default: () => ['edit', 'delete']
    },
    resource: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      search: '',
      loading: false,
      typeActions: {
        edit: {
          text: 'Sửa',
          type: 'warning',
          handle: (index, row) => this.handleEdit(index, row)
        },
        delete: {
          text: 'Xóa',
          type: 'danger',
          handle: (index, row) => this.handleDelete(index, row)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['peoples'])
  },
  mounted() {
    this.getPeople()
  },
  methods: {
    getPeople(query = null) {
      this.loading = true
      this.$store.dispatch(`${this.$props.resource}/list`, query)
        .then(res => {
          this.loading = false
        })
    },
    handleEdit(index, row) {
      this.$emit('edit-people', row)
    },
    handleDelete(index, { id }) {
      this.$confirm('Bạn chắc muốn xóa nó chứ?', 'Warning', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch(`${this.$props.resource}/delete`, id)
            .then(_ => {
              this.$message({
                type: 'success',
                message: 'Delete completed'
              })
            })
        })
    },
    handleCurrentChange(event) {
      this.getPeople({
        page: event
      })
    },
    handleSizeChange(event) {
      this.getPeople({
        limit: event,
        page: this.peoples.meta.currentPage
      })
    }
  }
}
</script>
<style lang="css">
  .mt-1 {
    margin-top: 10px !important;
  }
  .center {
    display: flex;
    justify-content: center;
  }
</style>
