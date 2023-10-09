import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface Props {
    imagePreview: string
    setCropper: (cropper: Cropper) => void
}

export default function PhotoWidgetCropper({imagePreview, setCropper}: Props) {
    return (
        <Cropper
            src={imagePreview}
            style={{ height: 300, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            background={false}
            onInitialized={(cropper) => setCropper(cropper)}
        />
    )
}
