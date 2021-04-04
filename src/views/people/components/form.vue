<template>
  <el-form ref="people" :model="people" :rules="formRule" label-width="120px">
    <el-form-item label="Tên" prop="name" required>
      <el-input
        ref="name"
        v-model="people.name"
        placeholder="Tên"
        name="name"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="Công việc" prop="job" required>
      <el-input v-model="people.job" />
    </el-form-item>
    <el-form-item label="Giới thiệu" prop="description" required>
      <el-input v-model="people.description" />
    </el-form-item>
    <el-form-item label="Ngày sinh" prop="birthday" required>
      <el-col :span="11">
        <el-date-picker
          v-model="people.birthday"
          type="date"
          placeholder="Chọn ngày sinh"
          style="width: 100%"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        />
      </el-col>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Chiều cao (cm)" prop="height">
          <el-input v-model="people.height" type="number" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Cân nặng (kg)" prop="weight">
          <el-input v-model="people.weight" type="number" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Quê quán" prop="hometown">
      <el-input v-model="people.hometown" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="submitting" @click="onSubmit">
        {{ people.id ? "Cập nhật" : "Tạo mới" }}
      </el-button>
      <el-button @click="$emit('closeDialog')">Hủy</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    people: {
      type: Object,
      default: () => {
        return {
          name: null,
          description: null,
          job: null,
          birthday: null,
          height: 0,
          weight: 0,
          hometown: null,
          socials: []
        }
      }
    }
  },
  data() {
    return {
      formRule: {
        name: [
          { required: true, message: 'Tên không được để trống', trigger: 'blur' }
        ],
        description: [{ required: true, trigger: 'blur' }],
        job: [{ required: true, trigger: 'blur' }],
        birthday: [{ required: true, trigger: 'blur' }],
        height: [],
        weight: [],
        hometown: [{ required: true, trigger: 'blur' }],
        socials: []
      },
      submitting: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.people.validate((valid) => {
        if (valid) {
          this.submitting = true
          this.$store.dispatch('people/saveOrUpdate', this.$props.people)
            .then(message => {
              this.$emit('closeDialog')
              this.$notify({
                title: 'Success',
                message,
                type: 'success'
              })
              this.submitting = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
