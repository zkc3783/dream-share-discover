<template>
  <scroll-bar>
    <el-menu 
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#FF0000"
      text-color="#00FF00"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
//这里可能是侧边栏的组件
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
