function 좌회전 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
}
function 우회전 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
}
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
let 거리 = 0
basic.forever(function () {
    huskylens.request()
    거리 = maqueen.Ultrasonic(PingUnit.Centimeters)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 15)
        }
        if (true) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
        }
        if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
        }
    } else {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
    }
    if (거리 < 15) {
        maqueen.motorStop(maqueen.Motors.All)
        basic.pause(1000)
        if (randint(1, 2) == 1) {
            좌회전()
        } else {
            우회전()
        }
        basic.pause(500)
    }
    if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 15)
    }
})
