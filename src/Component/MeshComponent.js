function MeshComponent(params) {

    let {mesh,width} = params;
    let name = "MeshComponent";


    return Object.freeze({
        name,
        mesh,
        width
    });


}

