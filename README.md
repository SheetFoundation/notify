# Notify

Plugin for displaying notification popups.

## Install

``` 🚀
$ npm i @sheetfoundation/notify
```

## Use

``` 🚀
import { notify, NotifyType } from "@sheetfoundation/notify"
import "@sheetfoundation/notify/dist/style.css"

notify.show({
  type: NotifyType.information,
  message: "This is a popup notification."
})
```