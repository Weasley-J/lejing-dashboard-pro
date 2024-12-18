# Lejing Dashboard Pro

The admin-dashboard for [lejing-mall](https://github.com/Weasley-J/lejing-mall), require node v20.x.x or later.

##### ![login](https://weasley.oss-cn-shanghai.aliyuncs.com/Photos/eebee5eb-1c3b-4576-99db-01180a86060f_20241013123828.png)

## Features

### Short GIFs

<div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-bottom: 5px">
<img src="resources/md/gif-dashboard-dark.gif" alt="Dashboard dark" style="border-radius: 5px;width: 50%; margin-right: 5px;">
<img src="resources/md/gif-dashboard-light.gif" alt="Dashboard light" style=" border-radius: 5px;width: 50%; margin-right: 0;">
</div>
<div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-bottom: 5px">
<img src="resources/md/gif-order-light.gif" alt="Order light" style="border-radius: 5px;width: 50%; margin-right: 5px;">
<img src="resources/md/gif-order-dark.gif" alt="Order light" style=" border-radius: 5px;width: 50%; margin-right: 0;">
</div>
<div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-bottom: 5px">
<img src="resources/md/gif-order-insight-dark.gif" alt="Order insight dark" style="border-radius: 5px;width: 50%; margin-right: 0;">
<img src="resources/md/gif-order-insight-light.gif" alt="Order insight light" style=" border-radius: 5px;width: 50%; margin-right: 0;">
</div>
### Short Videos

<div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
  <video style="display: flex; flex: 1; border-radius: 5px" width="480" height="320" controls>
    <source src="resources/md/video-hashboard.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <video style="display: flex; flex: 1;border-radius: 5px" width="480" height="320" controls>
    <source src="resources/md/video-all.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

# Tech Stack Links

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/reference/react/useActionState)
- [React-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
- [Ant Design](https://ant.design/docs/react/introduce)
- [Axios](https://axios-http.com/docs/intro)
- [Zustand](https://github.com/pmndrs/zustand)
- [ECharts](https://echarts.apache.org/en/option.html#series)
- [Resso](https://github.com/nanxiaobei/resso)
- [Iconfont](https://www.iconfont.cn/)

# Getting Started

```bash
npm run dev
```

React + TypeScript + Vite: This template provides a minimal setup to get React working in Vite with HMR and some ESLint
rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```javascript
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or
  `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```javascript
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
