import { LOG_COLOR } from './../config/constants.js'

export default function log(type, path, message) {
    console.log(`${LOG_COLOR[type]}%s\x1b[0m`, `[${type}] - ${path} -> ${message}`)
}