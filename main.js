//console.log(document.body)


function addSvg () {

    

    const body = document.body
    const svg = document.createElement('svg')
    const svgNs = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
    const svgNsX = document.createElementNS("http://www.w3.org/1999/xlink", 'xlink')
    const group = document.createElement('g')
    const rect = document.createElement('rect')


    body.appendChild(svgNs)
    svgNs.appendChild(group)
    //svg.appendChild(svgNs)
    //svg.appendChild(svgNsX)
    group.appendChild(rect)

    svgNs.setAttribute('class', 'piano-container')
    svgNs.setAttribute('id','piano')
    svgNs.setAttribute('width','100%')
    svgNs.setAttribute("version","1.1")
    //svgNs.setAttribute('xmlns', "http://www.w3.org/2000/svg")
    //svgNs.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink")
    svgNs.setAttribute('viewBox', "0 0 1120 400")

    group.setAttribute ('class','octave')
    group.setAttribute ('id','piano-octave')

    rect.setAttribute('class','key')
    rect.setAttribute('id','piano-key')
    rect.setAttribute('stroke', "#555555")
    rect.setAttribute('fill', "#FFFFF7")
    rect.setAttribute('x', "0")
    rect.setAttribute('y', "0")
    rect.setAttribute('width', "80")
    rect.setAttribute('height', "400")


}






console.log(body)
