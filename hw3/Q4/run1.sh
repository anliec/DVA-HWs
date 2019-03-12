hadoop jar ./target/q4-1.0.jar edu.gatech.cse6242.Q4 ./data/small.tsv ./data/q4outputSmall
hadoop fs -getmerge ./data/q4outputSmall/ q4outputSmall.tsv
hadoop fs -rm -r ./data/q4outputSmall
