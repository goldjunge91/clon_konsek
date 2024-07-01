export default {
  logo: <span>PDF-processor Documentation</span>,
  project: {
    link: 'https://github.com/yourusername/pdf-processor'
  },
  docsRepositoryBase: 'https://github.com/yourusername/pdf-processor/tree/main/pages',
  footer: {
    text: 'PDF-processor Documentation'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – PDF-processor'
    }
  }
}