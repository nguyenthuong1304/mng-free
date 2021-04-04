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
    <el-form-item label="Công việc" required>
      <el-input v-model="people.job" />
    </el-form-item>
    <el-form-item label="Giới thiệu" required>
      <el-input v-model="people.description" />
    </el-form-item>
    <el-form-item label="Ngày sinh" required>
      <el-col :span="11">
        <el-date-picker
          v-model="people.birthday"
          type="date"
          placeholder="Chọn ngày sinh"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Chiều cao (cm)">
          <el-input v-model="people.height" type="number" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Cân nặng (kg)">
          <el-input v-model="people.weight" type="number" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Quê quán">
      <el-input v-model="people.hometown" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">
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
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.people.validate((valid) => {
        if (valid) {
          this.$store.dispatch('people/saveOrUpdate', this.$props.people)
            .then(res => console.log(res))
        } else {
          return false
        }
      })
    }
  }
}
</script>
