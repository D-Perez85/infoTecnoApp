import {ContentState, EditorState} from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

export const prepareDraft = (value: string) => {
   const draft = htmlToDraft(value)
   const contentState = ContentState.createFromBlockArray(draft.contentBlocks)
   const editorState = EditorState.createWithContent(contentState)
   return editorState
}
