import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="Footer">
      <p style={{textAlign:"right"}}>
        PUC Minas 2023<br/>
        Ciência da Computação
      </p>
      <div className="pipe"></div>
      <p style={{textAlign:"left"}}>
        Trabalho Interdisciplinar V<br/>
        Redes e Arquitetura de Computadores
      </p>
    </div>
  )
}