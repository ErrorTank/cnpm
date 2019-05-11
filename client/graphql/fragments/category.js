import {gql} from "apollo-boost"

//Graphql suck
const CategoryInfoFragment = gql`
    fragment CategoryInfo on Category{
        _id
        name
        parent{
            _id
            name
            parent{
                _id
                name
                parent{
                    _id
                    name
                    parent{
                        _id
                        name
                        parent{
                            _id
                            name
                            parent{
                                _id
                                name
                                parent{
                                    _id
                                    name
                                    parent{
                                        _id
                                        name
                                        parent{
                                            _id
                                            name
                                            parent{
                                                _id
                                                name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    
`;


export {CategoryInfoFragment}