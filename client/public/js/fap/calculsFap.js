export function totalParContext(postes) {
  const totalCtx = {};
  postes.forEach(poste => {
    const context = poste.CONTEXT?.trim();
    const total = parseFloat(poste.TOTAL) || 0;
    if (!totalCtx[context]) {
      totalCtx[context] = 0;
    }

    totalCtx[context] += total;
  });
  console.log('total par context :', totalCtx);
  return totalCtx;
}
