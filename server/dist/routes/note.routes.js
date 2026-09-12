"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_js_1 = require("../controllers/note.controller.js");
// THIS WAS THE CULPRIT LAST TIME. WE NOW USE THE EXACT CORRECT IMPORT:
const authenticate_js_1 = require("../middlewares/authenticate.js");
const router = (0, express_1.Router)();
router.use(authenticate_js_1.authenticate);
router.get('/', note_controller_js_1.getNotes);
router.post('/', note_controller_js_1.saveNote);
router.delete('/:dateKey', note_controller_js_1.deleteNote);
exports.default = router;
