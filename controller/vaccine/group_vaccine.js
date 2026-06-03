const groupVaccinesByAgeGroup = (vaccines) => {
    return [...vaccines.reduce((map, { id_age_group, age_group_name, ...rest }) => {
        if (!map.has(id_age_group)) {
            map.set(id_age_group, { id_age_group, age_group_name, vaccines: [] })
        }
        map.get(id_age_group).vaccines.push(rest)
        return map
    }, new Map()).values()]
}

module.exports = { groupVaccinesByAgeGroup }