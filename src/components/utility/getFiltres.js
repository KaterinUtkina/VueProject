let getFilters = ({bottles, draft}) => {
    let filter_draft = [];
    let filter_bottles = []
    let filters = [filter_draft, filter_bottles]
    let arg = [draft, bottles]
    let keys = Object.keys(draft[0])
    let forDeletion = ["i", "p", "t", "c", "tap"]
    keys = keys.filter(key => !forDeletion.includes(key))
    for (let i = 0; i < filters.length; i++) {
        keys.map(key => {
            filters[i].push({name: key, value: []})
            arg[i].map(item => {
                filters[i].map(filter => {
                    if (filter.name === key) {
                        if (item[key].length !== 0 && item[key] !== "0" && item[key] !== "0.0") {
                            filter.value.push(item[key].trim())
                        }
                    }
                    filter.value = [...new Set(filter.value)];
                    if (filter.name === "m" || filter.name === "s") {
                        filter.value.sort()
                    } else {
                        return filter.value.sort((n1, n2) => (Number(n1 * 10) > Number(n2 * 10)) ? 1 : -1)
                    }
                })
            })
        })
    }
    return {filter_draft, filter_bottles}
}

export default getFilters

