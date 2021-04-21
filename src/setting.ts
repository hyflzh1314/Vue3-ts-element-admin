interface ISettings {
  title: string
  showTagsView: boolean
  showSidebarLogo: boolean
  fixedHeader: boolean
  devServerPort: number
  mockServerPort: number
}

const defaultSettings: ISettings = {
  title: 'Vue Typescript Admin',
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  devServerPort: 9527,
  mockServerPort: 9528
}
export default defaultSettings