const discordpfp = `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
document.getElementById("discordPfp").src = discordpfp

let json = {
  color: parseInt(0xffedad)
}

const invalidJson = document.getElementById("badJson")
var JSONEditor = CodeMirror(document.getElementById("outputcode"), {
  matchBrackets: true,
  autoCloseBrackets: true,
  mode: "application/ld+json",
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
})

JSONEditor.setValue(JSON.stringify(json, undefined, 2))

const updateEditor = () => {
  JSONEditor.setValue(JSON.stringify(json, undefined, 2))
  //console.log(json)
}

const fields = document.getElementById("fields")
const fieldsCount = document.getElementById("fieldsCount")
const addFieldButton = document.getElementById("addField")
const addField = () => {
  if (!json.fields) {
    Object.assign(json, {
      fields: []
    })
  }
  json.fields.push({
    name: "",
    value: "",
    inline: false,
  })
  updateEditor()
  distributeFields()
}

const distributeFields = () => {
  fields.innerHTML = ""
  for (const field of json.fields || []) {
    const index = json.fields.indexOf(field)
    const div = document.createElement(`div`)
    div.id = `field-${index}`
    div.classList.add('field')
    div.innerHTML = `
    <h3>Field ${index}</h3>
    <input type="text" name="field-${index}-name" id="field-${index}-name" class="fieldName" placeholder="Name" maxLength="256" value="${field.name}">
    <p id="field-${index}-name-counter" class="counter">${field.name.length}/256</p>
    <textarea name="field-${index}-value" id="field-${index}-value" class="fieldValue" placeholder="Value, markdown allowed" maxlength="1024">${field.value}</textarea>
    <p id="field-${index}-value-counter" class="counter">${field.value.length}/1024</p>
    <div class="fieldLower">
      Inline: <input type="checkbox" id="field-${index}-inline" class="inline" ${field.inline ? "checked" : ""}>
      <button class="delete" onclick="removeField(${index})">Delete</button>
    </div>
    `
    fields.appendChild(div)
    const name = document.getElementById(`field-${index}-name`)
    const nameCount = document.getElementById(`field-${index}-name-counter`)
    const value = document.getElementById(`field-${index}-value`)
    const valueCount = document.getElementById(`field-${index}-value-counter`)
    const inline = document.getElementById(`field-${index}-inline`)
    name.addEventListener('input', event => {
      const textArea = event.currentTarget
      const maxLength = textArea.getAttribute("maxlength")
      const currentLength = textArea.value.length

      if (currentLength >= maxLength - 50) {
        nameCount.classList.add("near")
      } else {
        nameCount.classList.remove("near")
      }

      nameCount.innerHTML = `${currentLength}/${maxLength}`
      json.fields[index].name = textArea.value

      updateEditor()
    })
    value.addEventListener('input', event => {
      const textArea = event.currentTarget
      const maxLength = textArea.getAttribute("maxlength")
      const currentLength = textArea.value.length

      if (currentLength >= maxLength - 100) {
        valueCount.classList.add("near")
      } else {
        valueCount.classList.remove("near")
      }

      valueCount.innerHTML = `${currentLength}/${maxLength}`
      json.fields[index].value = textArea.value

      updateEditor()
    })
    inline.addEventListener('change', () => {

      json.fields[index].inline = !json.fields[index].inline

      updateEditor()
    })
  }

  let length = 0
  if (json.fields) length = json.fields.length
  fieldsCount.innerHTML = `${length}/25`
  if (length >= 23) {
    fieldsCount.classList.add("near")
  } else {
    fieldsCount.classList.remove("near")
  }
  if (length === 25) {
    addFieldButton.classList.add("hide")
  } else {
    addFieldButton.classList.remove("hide")
  }
}

const removeField = (index) => {
  if (json.fields) {
    json.fields.splice(index, 1)
  }
  if (json.fields.length === 0) {
    delete json.fields
  }
  updateEditor()
  distributeFields()
}

const testJson = (json) => {
  try {
    JSON.parse(json)
    invalidJson.classList.add("hide")
    return true
  } catch {
    invalidJson.classList.remove("hide")
    return false
  }
}

const button = document.getElementById("copy")
const copy = () => {
  if (!navigator.clipboard) {
    const el = document.createElement('textarea')
    el.value = JSONEditor.getValue()
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  } else {
    navigator.clipboard.writeText(JSONEditor.getValue())
  }
  button.innerHTML = "Copied!"
  setTimeout(() => {
    button.innerHTML = "Copy"
  },3000)
}

const messageBody = document.getElementById("messageBody")
const messageBodyCount = document.getElementById("messageBodyCount")
const authorIconUrl = document.getElementById("authorIconUrl")
const authorName = document.getElementById("authorName")
const authorNameCount = document.getElementById("authorNameCount")
const authorUrl = document.getElementById("authorUrl")
const thumbnailUrl = document.getElementById("thumbnailUrl")
const title = document.getElementById("title")
const titleCount = document.getElementById("titleCount")
const titleUrl = document.getElementById("titleUrl")
const description = document.getElementById("description")
const descriptionCount = document.getElementById("descriptionCount")
const imageUrl = document.getElementById("imageUrl")
const footerText = document.getElementById("footerText")
const footerTextCount = document.getElementById("footerTextCount")
const footerIconUrl = document.getElementById("footerIconUrl")
const embedColor = document.getElementById("embedColor")
const embedBorder = document.getElementById("border")

JSONEditor.on('change', (i) => {
  if(testJson(i.getValue())) {
    if (!json.color) {
      json.color = parseInt(0xffedad)
      updateEditor()
    }
    embedBorder.style = `background-color: #${json.color.toString(16)};`
    if (JSON.stringify(json, undefined, 2) === i.getValue()) {
      return
    }
    json = JSON.parse(i.getValue())
    if (json.hasOwnProperty('content')) {
      messageBody.value = json.content
      messageBodyCount.innerHTML = `${messageBody.value.length}/${messageBody.maxLength}`
      if (messageBody.value.length >= messageBody.maxLength - 100) {
        messageBodyCount.classList.add("near")
      } else {
        messageBodyCount.classList.remove("near")
      }
    } else {
      messageBody.value = ""
      messageBodyCount.innerHTML = `0/${messageBody.maxLength}`
      messageBodyCount.classList.remove("near")
    }
    if (json.hasOwnProperty('author')) {
      if (json.author.hasOwnProperty('icon_url')) {
        authorIconUrl.value = json.author.icon_url
      } else {
        authorIconUrl.value = ""
      }
      if (json.author.hasOwnProperty('name')) {
        authorName.value = json.author.name
        authorNameCount.innerHTML = `${authorName.value.length}/${authorName.maxLength}`
        if (authorName.value.length >= authorName.maxLength - 50) {
          authorNameCount.classList.add("near")
        } else {
          authorNameCount.classList.remove("near")
        }
      } else {
        authorName.value = ""
        authorNameCount.innerHTML = `0/${authorName.maxLength}`
        authorNameCount.classList.remove("near")
      }
      if (json.author.hasOwnProperty('url')) {
        authorUrl.value = json.author.url
      } else {
        authorUrl.value = ""
      }
    } else {
      authorIconUrl.value = ""
      authorName.value = ""
      authorNameCount.innerHTML = `0/${authorName.maxLength}`
      authorNameCount.classList.remove("near")
      authorUrl.value = ""
    }
    if (json.hasOwnProperty('thumbnail')) {
      if (json.thumbnail.hasOwnProperty('url')) {
        thumbnailUrl.value = json.thumbnail.url
      } else {
        thumbnailUrl.value = ""
      }
    } else {
      thumbnailUrl.value = ""
    }
    if (json.hasOwnProperty('title')) {
      title.value = json.title
      titleCount.innerHTML = `${title.value.length}/${title.maxLength}`
      if (title.value.length >= title.maxLength - 50) {
        titleCount.classList.add("near")
      } else {
        titleCount.classList.remove("near")
      }
    } else {
      title.value = ""
      titleCount.innerHTML = `0/${title.maxLength}`
      titleCount.classList.remove("near")
    }
    if (json.hasOwnProperty('url')) {
      titleUrl.value = json.url
    } else {
      titleUrl.value = ""
    }
    if (json.hasOwnProperty('description')) {
      description.value = json.description
      descriptionCount.innerHTML = `${description.value.length}/${description.maxLength}`
      if (description.value.length >= description.maxLength - 100) {
        descriptionCount.classList.add("near")
      } else {
        descriptionCount.classList.remove("near")
      }
    } else {
      description.value = ""
      descriptionCount.innerHTML = `0/${description.maxLength}`
      descriptionCount.classList.remove("near")
    }
    if (json.hasOwnProperty('fields')) {
      distributeFields()
    } else {
      distributeFields()
    }
    if (json.hasOwnProperty('image')) {
      if (json.image.hasOwnProperty('url')) {
        imageUrl.value = json.image.url
      } else {
        imageUrl.value = ""
      }
    } else {
      imageUrl.value = ""
    }
    if (json.hasOwnProperty('footer')) {
      if (json.footer.hasOwnProperty('text')) {
        footerText.value = json.footer.text
        footerTextCount.innerHTML = `${footerText.value.length}/${footerText.maxLength}`
        if (footerText.value.length >= footerText.maxLength - 100) {
          footerTextCount.classList.add("near")
        } else {
          footerTextCount.classList.remove("near")
        }
      } else {
        footerText.value = ""
        footerTextCount.innerHTML = `0/${footerText.maxLength}`
        footerTextCount.classList.remove("near")
      }
      if (json.footer.hasOwnProperty('icon_url')) {
        footerIconUrl.value = json.footer.icon_url
      } else {
        footerIconUrl.value = ""
      }
    } else {
      footerText.value = ""
      footerTextCount.innerHTML = `0/${footerText.maxLength}`
      footerTextCount.classList.remove("near")
      footerIconUrl.value = ""
    }
  }
})

messageBody.addEventListener('input', event => {
    const textArea = event.currentTarget
    const maxLength = textArea.getAttribute("maxlength")
    const currentLength = textArea.value.length

    if (currentLength >= maxLength - 100) {
      messageBodyCount.classList.add("near")
    } else {
      messageBodyCount.classList.remove("near")
    }

    messageBodyCount.innerHTML = `${currentLength}/${maxLength}`

    if (currentLength === 0) {
      if (json.content) {
        delete json.content
      }
    } else {
      Object.assign(json, {
        content: `${textArea.value}`
      })
    }
    updateEditor()
})
authorIconUrl.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length

  if (currentLength === 0) {
    if (json.author) {
      if (json.author.icon_url) {
        delete json.author.icon_url
      }
      if (!json.author.url && !json.author.name) {
        delete json.author
      }
    }
  } else {
    if (!json.author) {
      Object.assign(json, {
        author: {}
      })
    }
    Object.assign(json.author, {
      icon_url: `${textArea.value}`
    })
  }
  updateEditor()
})
authorName.addEventListener('input', event => {
  const textArea = event.currentTarget
  const maxLength = textArea.getAttribute("maxlength")
  const currentLength = textArea.value.length

  if (currentLength >= maxLength - 50) {
    authorNameCount.classList.add("near")
  } else {
    authorNameCount.classList.remove("near")
  }

  authorNameCount.innerHTML = `${currentLength}/${maxLength}`
  if (currentLength === 0) {
    if (json.author) {
      if (json.author.name) {
        delete json.author.name
      }
      if (!json.author.url && !json.author.icon_url) {
        delete json.author
      }
    }
  } else {
    if (!json.author) {
      Object.assign(json, {
        author: {}
      })
    }
    Object.assign(json.author, {
      name: `${textArea.value}`
    })
  }
  updateEditor()
})

authorUrl.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length
  if (currentLength === 0) {
    if (json.author) {
      if (json.author.url) {
        delete json.author.url
      }
      if (!json.author.name && !json.author.icon_url) {
        delete json.author
      }
    }
  } else {
    if (!json.author) {
      Object.assign(json, {
        author: {}
      })
    }
    Object.assign(json.author, {
      url: `${textArea.value}`
    })
  }
  updateEditor()
})
thumbnailUrl.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length
  if (currentLength === 0) {
    if (json.thumbnail) {
      delete json.thumbnail
    }
  } else {
    if (!json.thumbnail) {
      Object.assign(json, {
        thumbnail: {}
      })
    }
    Object.assign(json.thumbnail, {
      url: `${textArea.value}`
    })
  }
  updateEditor()
})
title.addEventListener('input', event => {
  const textArea = event.currentTarget
  const maxLength = textArea.getAttribute("maxlength")
  const currentLength = textArea.value.length

  if (currentLength >= maxLength - 50) {
    titleCount.classList.add("near")
  } else {
    titleCount.classList.remove("near")
  }

  titleCount.innerHTML = `${currentLength}/${maxLength}`
  if (currentLength === 0) {
    if (json.title) {
      delete json.title
    }
  } else {
    Object.assign(json, {
      title: `${textArea.value}`
    })
  }
  updateEditor()
})
titleUrl.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length

  if (currentLength === 0) {
    if (json.url) {
      delete json.url
    }
  } else {
    Object.assign(json, {
      url: `${textArea.value}`
    })
  }
  updateEditor()
})
description.addEventListener('input', event => {
  const textArea = event.currentTarget
  const maxLength = textArea.getAttribute("maxlength")
  const currentLength = textArea.value.length

  if (currentLength >= maxLength - 100) {
    descriptionCount.classList.add("near")
  } else {
    descriptionCount.classList.remove("near")
  }

  descriptionCount.innerHTML = `${currentLength}/${maxLength}`

  if (currentLength === 0) {
    if (json.description) {
      delete json.description
    }
  } else {
    Object.assign(json, {
      description: `${textArea.value}`
    })
  }
  updateEditor()
})
imageUrl.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length

  if (currentLength === 0) {
    if (json.image) {
      delete json.image
    }
  } else {
    if (!json.image) {
      Object.assign(json, {
        image: {}
      })
    }
    Object.assign(json.image, {
      url: `${textArea.value}`
    })
  }
  updateEditor()
})
footerText.addEventListener('input', event => {
  const textArea = event.currentTarget
  const maxLength = textArea.getAttribute("maxlength")
  const currentLength = textArea.value.length

  if (currentLength >= maxLength - 100) {
    footerTextCount.classList.add("near")
  } else {
    footerTextCount.classList.remove("near")
  }

  footerTextCount.innerHTML = `${currentLength}/${maxLength}`

  if (currentLength === 0) {
    if (json.footer) {
      if (json.footer.text) {
        delete json.footer.text
      }
      if (!json.footer.icon_url) {
        delete json.footer
      }
    }
  } else {
    if (!json.footer) {
      Object.assign(json, {
        footer: {}
      })
    }
    Object.assign(json.footer, {
      text: `${textArea.value}`
    })
  }
  updateEditor()
})
footerIconUrl.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length


  if (currentLength === 0) {
    if (json.footer) {
      if (json.footer.icon_url) {
        delete json.footer.icon_url
      }
      if (!json.footer.text) {
        delete json.footer
      }
    }
  } else {
    if (!json.footer) {
      Object.assign(json, {
        footer: {}
      })
    }
    Object.assign(json.footer, {
      icon_url: `${textArea.value}`
    })
  }
  updateEditor()
})
embedColor.addEventListener('input', event => {
  const textArea = event.currentTarget
  const currentLength = textArea.value.length

  if (currentLength === 0) {
    json.color = parseInt(0xffedad)
    embedBorder.style = `background-color: #${json.color.toString(16)};`
  }
  const str = `0x${textArea.value}`
  if (parseInt(str)) {
    json.color = parseInt(str)
  } else {
    json.color = parseInt(0xffedad)
  }
  embedBorder.style = `background-color: #${json.color.toString(16)};`

  updateEditor()
})