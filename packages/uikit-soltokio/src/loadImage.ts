
export interface LoadImageOptions {
    /** Address of the resource */
    src: string
    /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
    srcset?: string
    /** Image sizes for different page layouts */
    sizes?: string
    /** Image alternative information */
    alt?: string
    /** Image classes */
    class?: string
    /** Image loading */
    loading?: HTMLImageElement['loading']
    /** Image CORS settings */
    crossorigin?: string
    /** Referrer policy for fetch https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
    referrerPolicy?: HTMLImageElement['referrerPolicy']
    /** Image width */
    width?: HTMLImageElement['width']
    /** Image height */
    height?: HTMLImageElement['height']
    /** https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#decoding */
    decoding?: HTMLImageElement['decoding']
    /** Provides a hint of the relative priority to use when fetching the image */
    fetchPriority?: HTMLImageElement['fetchPriority']
    /** Provides a hint of the importance of the image */
    ismap?: HTMLImageElement['isMap']
    /** The partial URL (starting with #) of an image map associated with the element */
    usemap?: HTMLImageElement['useMap']
}

const loadImage = (options: LoadImageOptions): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        const { src, srcset, sizes, class: className, loading, crossorigin, referrerPolicy, width, height, decoding, fetchPriority, ismap, usemap } = options

        img.src = src

        if (srcset != null) {img.srcset = srcset}
        if (sizes != null) {img.sizes = sizes}
        if (className != null) {img.className = className}
        if (loading != null) {img.loading = loading}
        if (crossorigin != null) {img.crossOrigin = crossorigin}
        if (referrerPolicy != null) {img.referrerPolicy = referrerPolicy}
        if (width != null) {img.width = width}
        if (height != null) {img.height = height}
        if (decoding != null) {img.decoding = decoding}
        if (fetchPriority != null) {img.fetchPriority = fetchPriority}
        if (ismap != null) {img.isMap = ismap}
        if (usemap != null) {img.useMap = usemap}

        img.onload = () => resolve(img)
        img.onerror = reject
    })
}