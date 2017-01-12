block('page').def().match((node, ctx) => { return !ctx.favicon; })((node, ctx) => {
    ctx.favicon='/favicon.ico';
    return applyNext();
});
