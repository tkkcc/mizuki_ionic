# ui for mizuki

final demo: https://tkkcc.github.io/mizuki_ionic

## conclusion

1. ionic fps drop occurs in modern phone (redmi K40, Snapdragon 870), during modal/select/router disappear, if disable animation, it feels lag.
1. ionic datetime widget can kill webview 74 in genymotion 7/10. enough amount of buttons cause render issue.
1. back press to dismiss modal and exit app need solve.
1. other webview based frameworks may be lag too, check https://onsen.io/demo/

## development

```sh
# web
ionic serve
ionic build
DOCS=1 ionic build

# init android project
ionic capacitor add android
ionic capacitor copy android

# update android project
ionic capacitor sync android
```

## template

```sh
ionic start mizuki list --type vue
```
