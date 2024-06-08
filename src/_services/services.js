const funcs = {
    general: new class {
        formatBytes(bytes, decimals = 2) {
            if (!+bytes) return '0 Bytes'
            const k = 1024
            const dm = decimals < 0 ? 0 : decimals
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            const i = Math.floor(Math.log(bytes) / Math.log(k))
            return `( ${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]} )`//TODO: Add spaces to this later
        }
    },


    SVGComponents: new class {// TODO: make a componant index file where it contains wrappers for each page like this file and put this svg and other componants in it
        blank_file(props) {
            return <svg
                width="100px"
                height="100px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-file-earmark-fill"
                {...props}
            >
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
        }
    },

    wrappers: new class {
        testing = new class {
            async file_input(console_log) {
                var temp = {}

                temp.functions = {
                    formatBytes: (props) => funcs.general.formatBytes(props)
                }

                if (console_log) {
                    console.log("wrapper data: ", await temp)
                }
                return temp
            }

        }
    }


}

export default funcs