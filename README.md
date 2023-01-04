ui for mizuki

development

```sh
# web
ionic serve
ionic build

# init android project
ionic capacitor add android
ionic capacitor copy android

# update android project
ionic capacitor sync android
```

template

```sh
ionic start mizuki list --type vue
```

tip
1. ion-chip is faster than ion-button, no render issue in genymotion android 10
1. disble animation feels much more lag on router
