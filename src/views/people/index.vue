<template>
  <div class="app-container">
    <div style="margin:0">
      <h3>Danh sách diễn viên</h3>
    </div>
    <table-basic resource="people" @edit-people="handleEdit" />
    <el-dialog
      title="Tips"
      :visible.sync="isEdit"
      :before-close="handleClose"
    >
      <FormPeople
        :people="people"
        @closeDialog="isEdit = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import TableBasic from '../../components/Table'
import FormPeople from './components/form'

export default {
  name: 'People',
  components: { TableBasic, FormPeople },
  data() {
    return {
      isEdit: false,
      people: {}
    }
  },
  mounted() {

  },
  methods: {
    handleEdit(people) {
      this.isEdit = true
      this.people = { ...people }
    },
    handleClose(done) {
      this.isEdit = false
      this.people = {}
    }
  }
}
</script>
