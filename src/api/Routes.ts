const apiRoute = "http://127.0.0.1:5000/";

//get
export const get_deaths_types = () => `${apiRoute}/get_list_of_death_types`;
export const get_deaths = (deathTypeId: number) => `${apiRoute}/get_death_for_death_type_id?id_death_type=${deathTypeId}`;
export const get_genes = () => `${apiRoute}/get_list_of_genes`;
export const get_factors = () => `${apiRoute}/get_list_of_factors`;

//add
export const add_death_type = () => `${apiRoute}/add_death_type`;
export const add_death = () => `${apiRoute}/add_death`;
export const add_gene = () => `${apiRoute}/add_gene`;
export const add_factor = () => `${apiRoute}/add_factor`;

//update
export const update_death = () => `${apiRoute}/update_death`;

//remove
export const remove_death_type = () => `${apiRoute}/remove_death_type`;
export const remove_death = (id: number) => `${apiRoute}/remove_death?id_death${id}`;