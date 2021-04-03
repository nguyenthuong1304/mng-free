<template>
  <div class="app-container">
    <div style="margin:0">
      <h3>Danh sách diễn viên</h3>
    </div>
    <fixed-thead />
  </div>
</template>

<script>
import FixedThead from '../table/dynamic-table/components/FixedThead'

export default {
  name: 'People',
  components: { FixedThead }
}
</script>
