huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
basic.forever(function () {
    huskylens.request()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
})
